const express = require('express');
require('dotenv').config()
const app = express()
const productsRoutes = require('./routes/products');
const connectDB = require('./DB/connection');

const USERNAME = process.env.DATABASE_USERNAME
const PASSWORD = encodeURIComponent(process.env.DATABASE_PASSWORD)
const MONGO_OBJ = process.env.MONGO_OBJ
const DATABASE_NAME = "STORE_API"
const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@nodeexpressproject.${MONGO_OBJ}.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
const PORT = 3000

app.get('/', (req, res) => {
    res.send("Hello Product API")
})
app.use('/api/v1/products', productsRoutes)

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, console.log(`Server is listening on port ${PORT}...\nhttp://localhost:${PORT}/`))
    } catch (error) {
        console.log(error)
    }
}

start()