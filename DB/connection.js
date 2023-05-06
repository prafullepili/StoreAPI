const mongoose = require('mongoose');

const connectDB = (url) => {
    const mongoCon = mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    if (mongoCon) {
        console.log("MongoDB connected!")
        return mongoCon;
    }
}

module.exports = connectDB