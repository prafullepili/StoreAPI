const express = require('express')
const app = express()


app.get('/', (req, res) => {
    res.send("Hello Product API")
})
const PORT = 3001
app.listen(PORT, () => {
    console.log(`server listing port ${PORT}`)
})