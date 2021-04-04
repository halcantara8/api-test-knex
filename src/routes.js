const express = require('express');
const router = express.Router();
const Multer = require('multer');


const Middlewares = require('./middlewares/middlewares')

const LoginController = require('./controllers/user/LoginController');
const UserController = require('./controllers/user/UserController');
const HomeController = require('./controllers/HomeController');


router.get('/', HomeController.index);
router.post('/login', LoginController.login);


// router.use(Middlewares.auth);
router.get('/users', UserController.index);
router.post('/users/store', UserController.store);
router.get('/logout', LoginController.logout);



router.get('/image', async (req, res)=>{
    res.json({any: 'ddd'});
});


//---------------- uploads ------------------------
const upload = require('./helpers/upload');

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

router.post('/upload', multer.single('file'), upload.uploadFile);


module.exports = router;