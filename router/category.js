const router = require('express').Router();
const categoryController = require('../controller/category');


router.post('/add', async (req, res) => {
    res.send(await categoryController.add(req.body));
});
router.get('/users', async (req, res) => {
    res.send(await categoryController.fetch(req.body));
});
router.get('/fetchlusers', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await categoryController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await categoryController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await categoryController.update(req.query.id, req.body);
	res.send(response);
})
module.exports = router;