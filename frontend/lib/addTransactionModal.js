import React from "react";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { addTransaction } from "./addTransaction";


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
    background: "blue",
    color: "#fff",
};

const cancelButtonStyle = {
    ...buttonStyle,
    marginRight: "10px",
    border: "1px solid #000",
};

const TransactionModal = ({ isOpen, onClose, books, transactionID, employeeID, totalPrice}) => {
    const [newTransaction, setNewTransaction] = useState({
        books: "",
        employeeID: ""
    });

    const handleTransaction = async () => {
        setNewTransaction({
            ...newTransaction,
            books: books,
            employeeID: employeeID
        });
        try {
            // Call your addTransaction function here
            console.log(newTransaction)
            await addTransaction(newTransaction);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error adding transaction:", error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    return (
        <>
            {isOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalPopupStyle}>
                        <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
                            = PEMBAYARAN =
                        </h2>
                        <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
                            ID TRANSAKSI {transactionID}
                        </h2>
                        <h2 style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.5rem" }}>
                            TOTAL HARGA RP{totalPrice}
                        </h2>
                        <div style={buttonContainerStyle}>
                            <div style={cancelButtonStyle} onClick={onClose}>
                                Kembali
                            </div>
                            <div style={confirmButtonStyle} onClick={handleTransaction}>
                                Lanjutkan
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TransactionModal;
