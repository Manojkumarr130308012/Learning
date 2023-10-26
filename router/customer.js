const router = require('express').Router();
const customerController = require('./../controller/customer');


router.post('/register', async (req, res) => {
    res.send(await customerController.register(req.body));
});

router.post('/login', async (req, res) => {
    res.send(await customerController.login(req.body));
});

router.get('/sent', async (req, res) => {
    res.send(await customerController.mail(req.query.mail,req.query.subject,req.query.text));
});

router.get('/users', async (req, res) => {
    res.send(await customerController.fetch(req.body));
});
router.get('/fetchlusers', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await customerController.fetchdata(req.query.id);
	res.send(response);
})
router.get('/fetchlusertype', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await customerController.fetchtype(req.query.usertype);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await customerController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await customerController.update(req.query.id, req.body);
	res.send(response);
})
router.put('/payment', async (req, res) => {
	const response = await customerController.update(req.query.id, req.body);
	res.send(response);
})
module.exports = router;