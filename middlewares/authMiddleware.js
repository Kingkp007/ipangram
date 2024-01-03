const JWT = require("jsonwebtoken");

module.exports = async (req,res,next) => {
    try {
        // when we send token datait is in header part
    const token = req.headers['authorization'].split(" ")[1] ;
    JWT.verify(token,process.env.JWT_SECRET,(err,decode) => {
        if(err){
            return res.status(200).send({
                message:'Auth Failed',
                success: false
        })
        } else {
            req.body.userId = decode.id 
            next()
        }
    })
    // in Body part data is there likke form data
    } catch (error) {
        console.log(error)
        res.status(401).send({message: 'Auth Failed', success: false});
    }
}
