require("dotenv").config();
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
const connectDB = require("./DB/connection")
const Product = require("./models/products")
const MONGO_URI = require("./app");

const jsonProducts = require('./products.json');
const { exitCode } = require("process");

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        readline.question("Do you really want to delete data from database -> Y/N ?", async confirmation => {
            if (confirmation == 'Y') {
                await Product.deleteMany();
                await Product.create(jsonProducts);
                console.log("deleted and created Success!!")
                process.exit()
            } else if (confirmation == "N") {
                await Product.create(jsonProducts);
                console.log('created Success!!');
                process.exit()
            } else {
                process.exit();
            }
        })
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}
start()