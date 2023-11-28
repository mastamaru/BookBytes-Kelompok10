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

employeeSchema.pre("save", async function (next) {
  if (this.isNew) {
    let prefix;
    switch (this.role.toLowerCase()) {
      case "admin":
        prefix = "A";
        break;
      case "cashier":
        prefix = "C";
        break;
    }

    const regex = new RegExp("^" + prefix + "\\d+$");
    const lastEmployee = await this.constructor
      .findOne({ id: { $regex: regex } })
      .sort({ id: -1 });

    if (lastEmployee) {
      const lastEmployeeIdNumber = parseInt(lastEmployee.id.substring(1));
      this.id = prefix + (lastEmployeeIdNumber + 1);
    } else {
      this.id = prefix + "1";
    }
  }
  next();
});

module.exports = mongoose.model("Employee", employeeSchema);
