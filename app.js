const express = require('express');
require('dotenv').config()
const app = express()
const productsRoutes = require('./routes/products');
const mongoose = require('mongoose');

const USERNAME = process.env.DATABASE_USERNAME
const PASSWORD = encodeURIComponent(process.env.DATABASE_PASSWORD)
const MONGO_OBJ = process.env.MONGO_OBJ
const DATABASE_NAME = "STORE_API"
const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@nodeexpressproject.${MONGO_OBJ}.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
const PORT = 3001

app.get('/', (req, res) => {
    res.send("Hello Product API")
})
app.use('/api/v1/products', productsRoutes)

app.listen(PORT, () => {
    const mongoCon = mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    if (mongoCon) {
        console.log("MongoDB connected!")
        console.log(`server listing port ${PORT}`)
        return mongoCon;
    }
})