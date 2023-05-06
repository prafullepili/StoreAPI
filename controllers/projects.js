const ProductModel = require('../models/products')

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, select } = req.query;
    const queryObj = {}

    if (featured) {
        queryObj.featured = featured == 'true' ? true : false;
    }
    if (company) {
        queryObj.company = company
    }
    if (name) {
        queryObj.name = { $regex: name, $options: 'i' }
    }
    let sortBy;
    if (!sort) {
        sortBy = 'createdAt';
    } else {
        sortBy = sort.split(',').join(' ');
    }

    let fieldList
    if (select) {
        fieldList = select.split(',').join(' ')
    }

    try {
        const products = await ProductModel.find(queryObj).sort(sortBy).select(fieldList);
        res.status(200).json({ nbHits: products.length, products })
    } catch (error) {
        res.status(402).json({ error })
    }
}

module.exports = {
    getAllProducts
}




// const input = "'price',name";
// const output = input
//     .split(",") // split the string into an array
//     .reduce((acc, curr) => {
//         acc[curr.replace(/'/g, '')] = 1; // remove the single quotes and add the key to the object
//         return acc;
//     }, {});
// console.log(output); // { price: 1, name: 1 }
