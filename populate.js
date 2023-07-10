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

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }

const start = async () => {
    try {
        await connectDB(MONGO_URI);
        readline.question("Do you really want to delete data from database -> Y/N ?", async confirmation => {
            if (confirmation == 'Y') {
                await Product.deleteMany();
                for (const key in jsonProducts) {
                    const element = jsonProducts[key];
                    // sleep(1000)
                    const p = await Product.create(element);
                    console.log(p)
                }
                // await Product.create(jsonProducts);
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