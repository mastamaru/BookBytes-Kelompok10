// errorHandlerMiddleware.js

const errorHandlerMiddleware = (err, req, res, next) => {
    // Handle validation errors
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Validation Error", errors: err.errors });
    }

     // Handle duplicate data errors
     if (err.code && err.code === 11000) {
        const duplicateField = Object.keys(err.keyValue)[0];
        const duplicateValue = err.keyValue[duplicateField];
        return res.status(409).json({
            message: "Duplicate Data Error",
            detail: `An entry with ${duplicateField}: ${duplicateValue} already exists in the collection.`
        });
    }
    // General error handling
    console.error(err); 
    res.status(500).json({ message: 'Server Error', error: err.message });
};

module.exports = errorHandlerMiddleware;
