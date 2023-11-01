const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Middleware pre-save untuk mengatur increment ID
employeeSchema.pre("save", async function (next) {
  if (this.isNew) {
    // Hanya berjalan saat dokumen baru dibuat
    const lastEmployee = await this.constructor.findOne().sort({ id: -1 }); // Dapatkan karyawan dengan ID terbesar
    if (lastEmployee) {
      const lastEmployeeIdNumber = parseInt(lastEmployee.id.substring(1)); // Dapatkan angka dari ID karyawan (abaikan huruf C)
      this.id = "C" + (lastEmployeeIdNumber + 1); // Buat ID baru dengan menambahkan 1 ke ID sebelumnya
    } else {
      this.id = "C1"; // Jika belum ada karyawan, set ID ke C1
    }
  }
  next();
});

module.exports = mongoose.model("Employee", employeeSchema);
