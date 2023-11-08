const express = require("express");
const router = express.Router();

const employeeController = require("../controller/employeeController.js");

// Route untuk menambahkan employee
router.post("/", employeeController.createEmployee);

// Route untuk mengambil semua data employee
router.get("/", employeeController.getAllEmployees);

// Route untuk edit data employee
router.put("/:idEmployee", employeeController.updateEmployee);

// Route untuk delete employee
router.delete("/:idEmployee", employeeController.deleteEmployee);



module.exports = router;
