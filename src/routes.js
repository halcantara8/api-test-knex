const express = require('express');
const router = express.Router();


const Middlewares = require('./middlewares/middlewares')

const LoginController = require('./controllers/user/LoginController');
const UserController = require('./controllers/user/UserController');
const HomeController = require('./controllers/HomeController');


router.get('/', HomeController.index);
router.post('/login', LoginController.login);


router.use(Middlewares.auth);
router.get('/users', UserController.index);
router.post('/users/store', UserController.store);
router.get('/logout', LoginController.logout);

module.exports = router;