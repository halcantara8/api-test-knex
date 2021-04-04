const User = require('../../models/User');

module.exports = {
    async login (req, res){
        try{
            const { username, password } = req.body;
            const user = await User.login(username, password);
            res.json(user);

        }catch(error){
            console.log(error);
        }
    },
    
    async logout(req, res){
        try{
            const [s, token] = req.headers.authorization.split(' ');  
            const loged = await User.logout(token);
            res.json(loged);
        }catch(error){
            res.status(400).json({'message': 'Houve um erro inesperado!'});
        }
    }
}