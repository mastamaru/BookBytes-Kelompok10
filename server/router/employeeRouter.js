const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employeeController.js");

// Route untuk menambahkan employee
router.post("/", employeeController.createEmployee);

// Route untuk mengambil semua data employee
router.get("/", employeeController.getAllEmployees);
module.exports = router;
