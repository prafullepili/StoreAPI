const ProductModel = require('../models/products')

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, select, numericFilters } = req.query;
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

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 50
    const skip = (page - 1) * limit;

    // ?numericFilters=price>40,rating>=4
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        )
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach(item => {
            const [filed, operator, value] = item.split('-')
            if (options.includes(filed)) {
                queryObj[filed] = { [operator]: Number(value) }
            }
        });
    }
    try {
        const products = await ProductModel.find(queryObj).sort(sortBy).select(fieldList).skip(skip).limit(limit);
        res.status(200).json({ count: products.length, products });
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
