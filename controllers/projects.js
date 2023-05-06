const ProductModel = require('../models/products')

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort } = req.query;
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
    try {
        const products = await ProductModel.find(queryObj).sort(sortBy);
        res.status(200).json({ nbHits: products.length, products })
    } catch (error) {
        res.status(402).json({ error })
    }
}

module.exports = {
    getAllProducts
}