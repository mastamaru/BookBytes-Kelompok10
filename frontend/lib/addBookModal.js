// AddBookModal.js
import React, { useState } from "react";
import Button from "@/components/Button";
import { addBook } from "@/lib/addBook";

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
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
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


const AddBookModal = ({ isOpen, onClose, onAddBook }) => {
    const [newBook, setNewBook] = useState({
        bookID: "",
        title: "",
        author: "",
        isbn: "",
        publisher: "",
        year: "",
        genre: "",
        price: "",
    });

    const handleAddBook = async () => {
        try {
            await addBook(newBook);
            // Close the modal and trigger the parent's onAddBook function
            onAddBook();
            setNewBook({
                bookID: "",
                title: "",
                author: "",
                isbn: "",
                publisher: "",
                year: "",
                genre: "",
                price: "",
            });
            onClose();

        } catch (error) {
            console.error("Error adding book:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <>
            {isOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalPopupStyle}>
                        <h2 style={{ fontweight: "bold", fontSize: "24px", marginBottom: "15px" }}>Menambahkan Buku</h2>

                        {/* Input fields */}
                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Book ID</label>
                            <input
                                type="text"
                                value={newBook.bookID}
                                onChange={(e) =>
                                    setNewBook({ ...newBook, bookID: e.target.value })
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Judul Buku</label>
                            <input
                                type="text"
                                value={newBook.title}
                                onChange={(e) =>
                                    setNewBook({ ...newBook, title: e.target.value })
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Pengarang</label>
                            <input
                                type="text"
                                value={newBook.author}
                                onChange={(e) =>
                                    setNewBook({ ...newBook, author: e.target.value })
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>ISBN</label>
                            <input
                                type="text"
                                value={newBook.isbn}
                                onChange={(e) =>
                                    setNewBook({ ...newBook, isbn: e.target.value })
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Penerbit</label>
                            <input
                                type="text"
                                value={newBook.publisher}
                                onChange={(e) =>
                                    setNewBook({ ...newBook, publisher: e.target.value })
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Tahun Terbit</label>
                            <input
                                type="text"
                                value={newBook.year}
                                onChange={(e) =>
                                    setNewBook({ ...newBook, year: e.target.value })
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Genre</label>
                            <input
                                type="text"
                                value={newBook.genre}
                                onChange={(e) =>
                                    setNewBook({ ...newBook, genre: e.target.value })
                                }
                                style={inputStyle}
                            />
                        </div>

                        <div style={inputContainerStyle}>
                            <label style={labelStyle}>Harga</label>
                            <input
                                type="text"
                                value={newBook.price}
                                onChange={(e) =>
                                    setNewBook({ ...newBook, price: e.target.value })
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
                            <div style={submitButtonStyle} onClick={handleAddBook}>
                                Tambah
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddBookModal;
