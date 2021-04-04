const adminfirebase = require("firebase-admin");

const uuid = require("uuid-v4");

const serviceAccount = require("../../comercial-singular-c5550-firebase-adminsdk-x2dwd-eb00f94c6a.json");

adminfirebase.initializeApp({
    credential: adminfirebase.credential.cert(serviceAccount),
    storageBucket: "gs://comercial-singular-c5550.appspot.com"
});

var bucket = adminfirebase.storage().bucket();

module.exports = {
    async uploadFile(req, res){
        try{
            const file = req.file;
            if(!file){
                return res.status(422).json({message: 'Arquivo ausente!', errors: false});
            }

            const blob = await bucket.file(file.originalname);
        
            const hasFile = await blob.exists();

            if(!hasFile[0]){
                const token = await uuid();

                const blobWriter = await blob.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                        metadata: {
                            firebaseStorageDownloadTokens: token,
                        }
                    }
                });
            
                await blobWriter.on('error', (err) => {
                    res.status(400).json({message: 'Erro ao fazer upload!', errors: false});
                });
                
                await blobWriter.on('finish', () => {
                    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media&token=${token}`;
                    return res.json({url}); 
                });
            
                blobWriter.end(file.buffer);

            }else{
                return res.status(422).json({message: 'Arquivo já inserido!', errors: false});
            }
            
        }catch(error){
            res.status(400).json({message: 'Houve um erro inesperado!', errors: false});
        }
    }
}
