var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', (req, res) => {
    models.item.findAll()
        .then(items => {
            res.json(items)
        }).catch(err => {
            res.status(400).json(err)
        })
});

module.exports = router;
