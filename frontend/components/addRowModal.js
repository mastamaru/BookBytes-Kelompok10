import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { fetchBooks } from "@/lib/getBook";
import { getNextTransactionId } from "@/lib/getTransaction";

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalPopupStyle = {
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  maxWidth: "400px",
  width: "100%",
  maxHeight: "70vh", // Set your desired maximum height
  overflowY: "auto", // Enable vertical scrolling if content overflows
  padding: "20px",
};

const buttonContainerStyle = {
  marginTop: "20px", // Adjust the margin to control the spacing
  display: "flex",
  justifyContent: "flex-end", // Align buttons to the end of the container
};

const buttonStyle = {
  borderRadius: "8px",
  padding: "10px 20px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  ...buttonStyle,
  marginRight: "10px", // Adjust the margin between buttons
  background: "#fd4d3e",
  color: "#fff",
};

const submitButtonStyle = {
  ...buttonStyle,
  background: "#18ef61",
  color: "#fff",
};

const labelStyle = {
  marginBottom: "5px",
  fontweight: "bold",
};

const inputContainerStyle = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%", // Set to your desired width
  padding: "10px",
  borderRadius: "8px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
};

const AddRowModal = ({ isOpen, onClose, onAddRow }) => {
  const [books, setBooks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(0);
  console.log(selectedStock)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await fetchBooks();
        setBooks(bookData);
      } catch (error) {
        console.error("Error fetching books:", error);
        // Handle error (e.g., show an error message to the user)
      }
    };

    if (isOpen) {
      fetchBook();
    }
  }, [isOpen]);

  const [newRow, setNewRow] = useState({
    idTransaction: "",
    title: "",
    quantity: "",
    price: "",
    totalPrice: "",
  });

  const handleTitleChange = (e) => {
    const selectedTitle = e.target.value;
    console.log("Selected Title:", selectedTitle);
    const selectedBook = books.find((book) => book.title === selectedTitle);

    if (selectedBook) {
      setSelectedStock(selectedBook.stock);
    }

    setNewRow({
      ...newRow,
      title: selectedTitle,
      price: selectedBook ? selectedBook.price : "", // Set the price based on the selected title
    });
  };

  const handleAddRow = () => {
    try {
      onAddRow(newRow);
      setNewRow({
        idTransaction: newRow.idTransaction,
        title: newRow.title,
        quantity: null,
        price: newRow.price,
        totalPrice: newRow.totalPrice,
      });
      setSelectedStock(null);
      onClose();
    } catch (error) {
      console.error("Error adding row:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      {isOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalPopupStyle}>
            <h2
              style={{
                fontweight: "bold",
                fontSize: "24px",
                marginBottom: "15px",
              }}
            >
              Menambahkan Baris
            </h2>

            <div style={inputContainerStyle}>
              <label>Judul Buku</label>
              <select
                value={books.title}
                onChange={
                  handleTitleChange
                }
                style={inputStyle}
              >
                <option value="" disabled selected>
                  Select a book
                </option>
                {books.map((book) => (
                  <option key={book.bookID} value={book.title} disabled={book.stock<=0}>
                    {`${book.title}: ${book.stock}`}
                  </option>
                ))}
              </select>
            </div>

            <div style={inputContainerStyle}>
              <label style={labelStyle}>Jumlah</label>
              <input
                type="number"
                value={newRow.quantity >= 0 ? newRow.quantity : 0}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value, 10);
                  const validQuantity = isNaN(inputValue)
                    ? 0
                    : Math.max(0, Math.min(inputValue, selectedStock));
                  setNewRow({ ...newRow, quantity: validQuantity });
                }}
                style={inputStyle}
              />
            </div>

            {/* Button Container */}
            <div style={buttonContainerStyle}>
              {/* Cancel Button */}
              <div style={cancelButtonStyle} onClick={() => {
                onClose();
                setSelectedStock(null);
              }}>
                Batal
              </div>
              {/* Submit Button */}
              <div style={submitButtonStyle} onClick={handleAddRow}>
                Tambah
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddRowModal;
