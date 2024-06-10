// db.js
const mongoose = require('mongoose');



const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://manabupadhyay123:hekmBIls9VQ2gKlo@cluster0.msockze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); // Exit process with failure
    }
};




module.exports = connectDB;