const jwt = require('jsonwebtoken');
const key = process.env.ENCODER_KEY || 'C904050D76EA60208C3674E7A53F00A1D756F448079AD0AC122AFEE8F551BFA52';
const database = require('../database/database');

module.exports = {
    async createToken(user_id){//cria um token
        return await jwt.sign({ user_id }, key,{
            expiresIn: '8h',
        });
    },

    async verifyToken(authorization){
        if(!authorization){//
            return { status: false, statusCode: 401, msg: "Faça login novamente!" };
        }
        if(!authorization.includes('Beares')){
            return { status: false, statusCode: 401, msg: "Faça login novamente!" };
        }

        const [_, token] = authorization.split(' ');

        if(!token){
            return {status: false, statusCode: 401, msg: "Faça login novamente!"};
        }

        const tokenIsValid = await database('tokens').select('*').where('token', token);

        if(tokenIsValid.length > 0){
            return jwt.verify(token, key, async (err, decoded)=>{
                if(err){
                    await database('tokens').where('token', token).del();
                    return {status: false, statusCode: 401, msg: "Faça login novamente!"};
                }
    
                return {status: true, user_id: decoded.user_id};
            });
        }else{
            return {status: false, statusCode: 401, msg: "Faça login novamente!"};

        }        
    },
}