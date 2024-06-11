import React from "react";
import Image from "next/image";
import { useState } from "react";
import { addTransaction } from "@/lib/addTransaction";
import { storage, db } from '@/lib/FirebaseConfig'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from "next/router";
import { addImgPayment } from "@/lib/addImgPayment";

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

const labelStyle = {
  marginBottom: "5px",
  fontweight: "bold",
};

const inputContainerStyle = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "15px",
  marginTop: "20px",
};

const inputStyle = {
  width: "100%", // Set to your desired width
  padding: "10px",
  borderRadius: "8px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
};

const TransactionBerkah = ({
  isOpen,
  onClose,
  // books,
  transactionID,
  // employeeID,
  totalPrice,
  // username
}) => {
  const router = useRouter();
  console.log(transactionID);

  const [newTransaction, setNewTransaction] = useState({
    // books: "",
    // employeeID: "",
  });

  const handleTransaction = async () => {
    console.log(imgUrl, transactionID)
    // setNewTransaction({
    //   // ...newTransaction,
    //   idTransaction: transactionID,
    //   imgPayment: imgUrl
    // });
    try {
      // Call your addTransaction function here
      // console.log('newTransaction',newTransaction);
      await addImgPayment(transactionID, {imgPayment: imgUrl});
      onClose();
      alert('upload Bukti Bayar success');
      window.location.reload();
    } catch (error) {
      console.error("Error adding transaction:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const handleFileUpload = async (imgFile) => {
    if (!imgFile) {
      alert('Please select a file first');
      return;
    }

    try {
      const storageRef = ref(storage, `payment/${imgFile.name}`);
      
      const snapshot = await uploadBytes(storageRef, imgFile);
      
      const url = await getDownloadURL(snapshot.ref);
      setImgUrl(url);   
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalPopupStyle}>
            <h2
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              SCAN QRIS
            </h2>
            <Image src={"/assets/qris.png"} width={180} height={100} alt="logo" layout="responsive" />
            <h2
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              ID TRANSAKSI {transactionID}
            </h2>
            <h2
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "1.5rem",
              }}
            >
              TOTAL HARGA RP{totalPrice}
            </h2>

            {/* upload file bukti bayar */}
            <div style={inputContainerStyle}>
              <label style={labelStyle}>Upload Bukti Bayar</label>
              <input
                type="file"
                // value={(e) => setImgFile(e.target.files[0])}
                onChange={(e) =>
                  setImgFile(e.target.files[0])
                }
                style={inputStyle}
              />
              <div className="flex justify-end items-end">
                <button className="p-1 font-medium font-mplus bg-purple-300 w-fit rounded-md mt-1" type="submit" onClick={() => handleFileUpload(imgFile)}>Upload</button>
              </div>
            </div>

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

export default TransactionBerkah;
