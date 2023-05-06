const express = require('express')
const app = express()
const productsRoutes = require('./routes/products');


app.get('/', (req, res) => {
    res.send("Hello Product API")
})
app.use('/api/v1/products', productsRoutes)


const PORT = 3001
app.listen(PORT, () => {
    console.log(`server listing port ${PORT}`)
})