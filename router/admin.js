const router = require('express').Router();
const adminController = require('../controller/admin');



router.post('/register', async (req, res) => {
    res.send(await adminController.register(req.body));
});

router.post('/login', async (req, res) => {
    res.send(await adminController.login(req.body));
});

router.get('/sent', async (req, res) => {
    res.send(await adminController.mail(req.query.mail,req.query.subject,req.query.text));
});

router.get('/users', async (req, res) => {
    res.send(await adminController.fetch(req.body));
});
router.get('/fetchlusers', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await adminController.fetchdata(req.query.id);
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await adminController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await adminController.update(req.query.id, req.body);
	res.send(response);
})
module.exports = router;