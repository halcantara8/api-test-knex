const User = require('../../models/User');

module.exports = {
    async index(req, res){
        try{
            const users = await User.all();
            res.json(users);
        }catch(e){
            res.status(400).json({message: 'Houve um erro inesperado!', data: false});
        }
    },

    async store(req, res){
        try{
            let user = await User.store(req.body);
            res.json(user);
        }catch(error){
            if(error.status){
                res.status(error.status).json({message: 'Há erros na validação dos dados.', errors: error.errors });
            }else{
                res.status(400).json({message: 'Houve um erro inesperado!', errors: false});
            }            
        }   
    }
}