const express = require("express");
const router = express.Router();

const transactionController = require("../controller/transactionController");

//membuat transaksi
router.post("/", transactionController.createTransaction);

//mendapatkan semua transaksi
router.get("/", transactionController.getAllTransactions);

//update transaksi
router.put("/:idTransaction", transactionController.updateTransaction);

//menghapus transaksi
router.delete("/:idTransaction", transactionController.deleteTransaction);

router.get("/user/:username", transactionController.getTransactionByUsername)

//confirm transaction
router.put("/:idTransaction/confirm", transactionController.updateTransactionStatus);

//reject transaction
router.delete("/:idTransaction/reject", transactionController.deleteTransaction);

//get a specific transaction by idTransaction
router.get("/:idTransaction", transactionController.getTransaction);

// Confirm a transaction
router.put('/:id/confirm', transactionController.confirmTransaction);

// Reject a transaction
router.delete('/:id/reject', transactionController.rejectTransaction);

module.exports = router;
