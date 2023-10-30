const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    id: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema);