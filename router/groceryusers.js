const router = require('express').Router();
const groceryuserController = require('../controller/groceryusers');


router.post('/add', async (req, res) => {
    res.send(await groceryuserController.add(req.body));
});
router.get('/', async (req, res) => {
    res.send(await groceryuserController.fetch(req.body));
});
router.get('/fetchUsers', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await groceryuserController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await groceryuserController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await groceryuserController.update(req.query.id, req.body);
	res.send(response);
})




module.exports = router;