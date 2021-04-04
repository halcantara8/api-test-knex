const database = require('../database/database');

const niv = require('node-input-validator');

niv.extend('unique', async ({ value, args }) => {
    const filed = args[1] || 'email';
     
    let exist = await database(args[0]).select('id').where(args[1], value).andWhere(function(){
        if(args[2]){
            this.where('id', '!=', args[2]);
        };
      });
  
    if (exist.length > 0) {
      return false;
    }
  
    return true;
});

niv.extendMessages({
    required: 'O campo :attribute não pode ser vazio.',
    email: 'Este e-mail é inválido.',
    even: 'The value of the field must be even number.',
    status: 'Invalid status',
    minLength: 'O campo :attribute deve conter mais que :arg0 caracteres.',
    maxLength: 'O campo :attribute deve conter menos que :arg0 caracteres.',
    same: 'O campo :attribute não confere com a confirmação.',
    unique: 'O campo :attribute já está cadastrado.'
}, 'en');

function ExceptionInvalid(status, errors) {
    this.status = status;
    let erros = {};
    Object.keys(errors).forEach(element => {
        erros[element] = errors[element].message;
    });

    this.errors = erros;
}

module.exports = {
    async validate(data, rules){
        const v = new niv.Validator(data, rules);
        
        const matched = await v.check();
        if (!matched) {
            throw new ExceptionInvalid(422, v.errors);
        } else {
            return false;
        }
    }
}