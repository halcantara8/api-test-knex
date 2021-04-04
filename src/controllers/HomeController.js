module.exports = {
    async index (req, res){
        try {
            res.send('Home');
        } catch (error) {
            console.log(error);
        }
    }   
}