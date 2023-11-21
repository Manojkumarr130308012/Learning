const router = require('express').Router();
const groceryproductsController = require('../controller/groceryproducts');


router.post('/add', async (req, res) => {
    res.send(await groceryproductsController.add(req.body));
});
router.get('/', async (req, res) => {
    res.send(await groceryproductsController.fetch(req.body));
});
router.get('/fetchUsers', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await groceryproductsController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await groceryproductsController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await groceryproductsController.update(req.query.id, req.body);
	res.send(response);
})
router.post('/login', async (req, res) => {
    res.send(await groceryproductsController.login(req.body));
});



module.exports = router;