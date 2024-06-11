import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { editBook } from "@/lib/editBook";

const predefinedGenres = [
  "Fiksi",
  "Non Fiksi",
  "Fiksi Ilmiah",
  "Misteri",
  "Fantasi",
  "Drama",
  "Horror",
  "Romansa",
];

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalPopupStyle = {
  background: "#fff",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  maxWidth: "400px",
  width: "100%",
  maxHeight: "70vh", // Set your desired maximum height
  overflowY: "auto", // Enable vertical scrolling if content overflows
  padding: "20px",
};

const buttonContainerStyle = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "flex-end",
};

const buttonStyle = {
  borderRadius: "8px",
  padding: "10px 20px",
  cursor: "pointer",
};

const cancelButtonStyle = {
  ...buttonStyle,
  marginRight: "10px",
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
  fontWeight: "bold",
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

const EditBookModal = ({ isOpen, onClose, onEditBook, selectedBook }) => {
  const [editedBook, setEditedBook] = useState({ ...selectedBook });

  useEffect(() => {
    setEditedBook({ ...selectedBook });
  }, [selectedBook]);

  const handleEditBook = async () => {
    try {
      await editBook(selectedBook.bookID, editedBook);
      onEditBook();
      onClose();
    } catch (error) {
      console.error("Error editing book:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <>
      {isOpen && (
        <div style={modalOverlayStyle} className="z-[99999]">
          <div style={modalPopupStyle}>
            <h2
              style={{
                fontWeight: "bold",
                fontSize: "24px",
                marginBottom: "15px",
              }}
            >
              Edit Buku
            </h2>

            {/* Input fields */}
            <div style={inputContainerStyle}>
              <label style={labelStyle}>Book ID</label>
              <input
                type="text"
                value={editedBook.bookID}
                disabled
                style={inputStyle}
              />
            </div>

            <div style={inputContainerStyle}>
              <label style={labelStyle}>Judul Buku</label>
              <input
                type="text"
                value={editedBook.title}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, title: e.target.value })
                }
                style={inputStyle}
              />
            </div>

            <div style={inputContainerStyle}>
              <label style={labelStyle}>Pengarang</label>
              <input
                type="text"
                value={editedBook.author}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, author: e.target.value })
                }
                style={inputStyle}
              />
            </div>

            <div style={inputContainerStyle}>
              <label style={labelStyle}>ISBN</label>
              <input
                type="text"
                value={editedBook.isbn}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, isbn: e.target.value })
                }
                style={inputStyle}
              />
            </div>

            <div style={inputContainerStyle}>
              <label style={labelStyle}>Penerbit</label>
              <input
                type="text"
                value={editedBook.publisher}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, publisher: e.target.value })
                }
                style={inputStyle}
              />
            </div>

            <div style={inputContainerStyle}>
              <label style={labelStyle}>Tahun Terbit</label>
              <input
                type="text"
                value={editedBook.year}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, year: e.target.value })
                }
                style={inputStyle}
              />
            </div>

            <div style={inputContainerStyle}>
              <label style={labelStyle}>Genre</label>
              <select
                value={editedBook.genre}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, genre: e.target.value })
                }
                style={inputStyle}
              >
                <option value="" disabled>
                  Select a genre
                </option>
                {predefinedGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div style={inputContainerStyle}>
              <label style={labelStyle}>Stock</label>
              <input
                type="text"
                value={editedBook.stock}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, stock: e.target.value })
                }
                style={inputStyle}
              />
            </div>

            <div style={inputContainerStyle}>
              <label style={labelStyle}>Harga</label>
              <input
                type="text"
                value={editedBook.price}
                onChange={(e) =>
                  setEditedBook({ ...editedBook, price: e.target.value })
                }
                style={inputStyle}
              />
            </div>

            {/* Button Container */}
            <div style={buttonContainerStyle}>
              {/* Cancel Button */}
              <div style={cancelButtonStyle} onClick={onClose}>
                Batal
              </div>
              {/* Submit Button */}
              <div style={submitButtonStyle} onClick={handleEditBook}>
                Edit
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditBookModal;
