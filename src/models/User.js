const database = require('../database/database');
const crypto = require('crypto');
const validator = require('../helpers/validator');
const auth = require('../helpers/auth');

module.exports = {
    all(){
        return database('users').select('id', 'nome', 'email', 'username', 'created_at', 'updated_at');  
    },

    async store(data){    
        let rules = {
            nome: 'required|string',
            email: 'required|email|unique:users,email' + (data.id ? (','+data.id) : ''),
            username: 'required|minLength:5|maxLength:18|unique:users,username' + (data.id ? (','+data.id) : ''),
            password: 'required|minLength:6|maxLength:18|same:confirm_password'
        };
        
        await validator.validate(data, rules); // senão validar, gera uma exceção
        
        delete data.confirm_password;
        const hash = crypto.createHash('md5');
        hash.update('123456', 'md5');
        data.password = hash.digest('hex');

        return database('users').insert(data);           
    },

    async login(username, password){
        const hash = crypto.createHash('md5');
        hash.update(password, 'md5');
        password = hash.digest('hex');

        let user = await database('users').select('id').where('username', username).andWhere('password', password).first();
       
        if(!user){
            return {status: 401, message: "Usuário e/ou senha incorreto!"};
        }else{
            const token = await auth.createToken(user.id);

            await database('tokens').where('user_id', user.id).del();

            await database('tokens').insert({user_id: user.id, token});

            return {user_id: user.id, token};
        }
    },

    async logout(token){
        await database('tokens').where('token', token).del();
        return {success: true};
    }
};