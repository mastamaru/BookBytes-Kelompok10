const mongoose = require('mongoose');

// URL koneksi MongoDB Anda

const connectDB= async()=>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
            // useFindAndModify:false,
            // useCreateIndex:true
        })
        console.log(`MongoDB connected: ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
// Export koneksi untuk digunakan dalam aplikasi Anda
module.exports = connectDB;
