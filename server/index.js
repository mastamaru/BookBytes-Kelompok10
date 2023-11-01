const express = require("express");
require("dotenv").config();

const connectDB = require("./database/connection");

const bookRouter = require("./router/bookRouter");
const transactionRouter = require("./router/transactionRouter");
const employeeRouter = require("./router/employeeRouter");

const app = express();

app.use(express.json()); // Middleware untuk parsing JSON requests
app.use("/books", bookRouter); // Menggunakan bookRouter untuk endpoint '/books'
app.use("/transactions", transactionRouter); // Menggunakan transactionRouter untuk endpoint '/transactions'
app.use("/employee", employeeRouter); // Menggunakan employeeRouter untuk endpoint '/employee'

const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
app.use(errorHandlerMiddleware);

const PORT = process.env.port || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
