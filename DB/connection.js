const mongoose = require('mongoose');

const connectDB = (url) => {
    const mongoCon = mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }, (err)=>err ? console.log(err): console.log("MongoDB connected..."))
}

module.exports = connectDB