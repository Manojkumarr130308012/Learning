const router = require('express').Router();
const vechicleController = require('../controller/vechiclestock');


router.post('/add', async (req, res) => {
    res.send(await vechicleController.add(req.body));
});
router.get('/vechicle', async (req, res) => {
    res.send(await vechicleController.fetch(req.body));
});
router.get('/fetchvechicle', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicleController.fetchdata(req.query.id);
	res.send(response);
});
router.get('/fetchvechiclebystatus', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await vechicleController.fetchdatabystatus(req.query.status);
	res.send(response);
});
router.delete('/delete', async (req, res) => {
	const response = await vechicleController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await vechicleController.update(req.query.id, req.body);
	res.send(response);
})
router.get('/vechiclestate', async (req, res) => {
    res.send(await vechicleController.orderfetch());
});

router.get('/vechiclestatecount', async (req, res) => {
    res.send(await vechicleController.fetchdatabystatuscount());
});


module.exports = router;