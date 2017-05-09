var express = require('express');
var router = express.Router();
var models = require('../models')

router.get('/', (req, res) => {
    models.order.findAll()
        .then(orders => {
            res.json(orders)
        }).catch(err => {
            res.status(400).json(err)
        })
});

router.get('/:table', (req, res) => {
    models.order.findAll({
            where: {
                tableId: req.body.table
            }
        })
        .then(orders => {
            res.json(orders)
        }).catch(err => {
            res.status(400).json(err)
        })
})

router.post('/', (req, res) => {
    console.log(req.body);
    var order = {
        tableId: req.body.tableId,
        comments: req.body.comments,
        amount: req.body.amount,
    }
    models.order.create(order)
        .then(newOrder => {
            order = newOrder
            var items = req.body.items.map(item => {
                item.orderId = newOrder.id
                item.itemId = item.id
                delete item.id
                return item
            })
            console.log(items)
            return models.orderItem.bulkCreate(items)
        }).then(() => {
            res.json(order)
        }).catch(err => {
            res.status(400).json(err)
        })
})

module.exports = router;
