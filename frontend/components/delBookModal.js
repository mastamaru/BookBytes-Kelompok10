
import React from "react";
import Button from "@/components/Button";

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
    padding: "20px",
};


const buttonContainerStyle = {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
};

const buttonStyle = {
    borderRadius: "8px",
    padding: "10px 20px",
    cursor: "pointer",
};

const confirmButtonStyle = {
    ...buttonStyle,
    background: "red",
    color: "#fff",
};

const cancelButtonStyle = {
    ...buttonStyle,
    marginRight: "10px",
    border: "1px solid #000",
};

const DeleteBookModal = ({ isOpen, onClose, onDeleteBook }) => {
    return (
        <>
            {isOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalPopupStyle}>
                        <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
                            Hapus Buku
                        </h2>
                        <p style={{ textAlign: "center", marginTop: "10px" }}>
                            Apakah Anda yakin ingin menghapus buku ini?
                        </p>
                        <div style={buttonContainerStyle}>
                            <div style={cancelButtonStyle} onClick={onClose}>
                                Batal
                            </div>
                            <div style={confirmButtonStyle} onClick={onDeleteBook}>
                                Hapus
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteBookModal;
