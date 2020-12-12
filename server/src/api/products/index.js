const { Router } = require('express');
const Product = require('./model');

const router = Router();

router.get('/', (req, res) => {
    Product.findAll()
        .then(products => {
            res.status(200).json(products);
        })
        .catch(err => {
            console.error("Error occurred during connection with db: ", err);
            res.status(500).json();
        });
});

module.exports = router;