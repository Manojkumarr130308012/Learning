const router = require('express').Router();
const ordersController = require('../controller/orders');


router.post('/add', async (req, res) => {
    res.send(await ordersController.add(req.body));
});
router.get('/order', async (req, res) => {
    res.send(await ordersController.fetch(req.body));
});
router.get('/fetchlorders', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await ordersController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await ordersController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await ordersController.update(req.query.id, req.body);
	res.send(response);
})
module.exports = router;