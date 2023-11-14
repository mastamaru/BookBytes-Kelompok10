const Employee = require("../models/employeeModel"); // Pastikan lokasi model sesuai
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const employeeController = {
  // Fungsi untuk menambahkan kasir baru
  createEmployee: async (req, res) => {
    try {
      const { id, name, role, username, password } = req.body;

      // Mengecek apakah username sudah digunakan
      const existingUser = await Employee.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Username already exists" });
      }

      // Memeriksa panjang password
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password should be at least 6 characters long",
        });
      }

      // Jika ID tidak disediakan, tentukan ID berdasarkan default value
      let employeeID = id;
      if (!id) {
        const lastEmployee = await Employee.find().sort({ _id: -1 }).limit(1);
        const lastID =
          lastEmployee[0] && lastEmployee[0].id
            ? parseInt(lastEmployee[0].id.slice(1))
            : 0;
        employeeID = `C${lastID + 1}`;
      }

      // Hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const employee = new Employee({
        id: employeeID,
        name,
        role,
        username,
        password: hashedPassword,
      });

      await employee.save();
      res.status(201).json({ success: true, data: employee });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  getAllEmployees: async (req, res) => {
    try {
      const employees = await Employee.find(); // Mengambil semua data employee
      res.status(200).json({ success: true, data: employees });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateEmployee: async (req, res) => {
    const { idEmployee } = req.params;
    const updatedEmployeeData = req.body;

    try {
      // Cek apakah karyawan dengan ID yang diberikan ada
      const existingEmployee = await Employee.findOne({ id: idEmployee });

      // Log the existing employee for debugging
      console.log("Existing Employee:", existingEmployee);

      if (!existingEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Jika ada, perbarui data karyawan
      // Hash password jika ada perubahan
      if (updatedEmployeeData.password) {
        const salt = await bcrypt.genSalt(10);
        updatedEmployeeData.password = await bcrypt.hash(
          updatedEmployeeData.password,
          salt
        );
      }

      const updatedEmployee = await Employee.findOneAndUpdate(
        { id: idEmployee },
        updatedEmployeeData,
        { new: true }
      );

      res.json(updatedEmployee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  deleteEmployee: async (req, res) => {
    const { idEmployee } = req.params;

    try {
      // Cek apakah karyawan dengan ID yang diberikan ada
      const existingEmployee = await Employee.findOne({ id: idEmployee });

      if (!existingEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Jika ada, hapus data karyawan
      await Employee.deleteOne({ id: idEmployee });

      res.json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  verifyEmployee: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Verify if the employee with the given name exists
      const existingEmployee = await Employee.findOne({ username });

      if (!existingEmployee) {
        return res.json("Wrong username");
      }

      // Verify if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(
        password,
        existingEmployee.password
      );

      if (passwordMatch) {
        const token = jwt.sign(
          { id: existingEmployee._id, role: existingEmployee.role },
          process.env.JWT_SECRET,
          { expiresIn: "12h" }
        );

        res.json({ token, role: existingEmployee.role });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = employeeController;
