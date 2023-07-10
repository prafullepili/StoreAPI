const express = require('express');
require('dotenv').config()
const app = express()
const productsRoutes = require('./routes/products'); //Routes
const connectDB = require('./DB/connection'); //DB connect logic

const USERNAME = process.env.DATABASE_USERNAME
const PASSWORD = encodeURIComponent(process.env.DATABASE_PASSWORD)
const MONGO_OBJ = process.env.MONGO_OBJ
const DATABASE_NAME = "STORE_API"
const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@nodeexpressproject.${MONGO_OBJ}.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
const PORT = 3000

app.use('/api/v1/products', productsRoutes)

// products?sort=createdAt&limit=10&page=1&select=company,price&featured=true&name="wooden desk"&numericFilters=price>40,rating>=4
// products?sort=createdAt&page=1&select=company,price&numericFilters=price<40
// products?numericFilters=price<20&select=company,price

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, console.log(`Server is listening on port ${PORT}...\nhttp://localhost:${PORT}/`))
    } catch (error) {
        console.log(error)
    }
}

start()
module.exports = MONGO_URI