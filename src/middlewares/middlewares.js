const auth = require('../helpers/auth');

module.exports = {
    async auth(req, res, next){
        const object = await auth.verifyToken(req.headers.authorization);    
        if(!object.status){
            return res.status(object.statusCode).json(object);
        }  
        return next();
    }
}