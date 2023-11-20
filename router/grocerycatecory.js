const router = require('express').Router();
const grocerycategoryController = require('../controller/grocerycatecory');


router.post('/add', async (req, res) => {
    res.send(await grocerycategoryController.add(req.body));
});
router.get('/', async (req, res) => {
    res.send(await grocerycategoryController.fetch(req.body));
});
router.get('/fetchUsers', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await grocerycategoryController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await grocerycategoryController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await grocerycategoryController.update(req.query.id, req.body);
	res.send(response);
})
router.post('/login', async (req, res) => {
    res.send(await grocerycategoryController.login(req.body));
});



module.exports = router;