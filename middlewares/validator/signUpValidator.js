import joi from 'joi'

export const signUpValidator = (req, res, next) =>{

    const schema = joi.object( {
        name: joi.string().required().min(3).max(25),
        image: joi.string().required().uri(),
        email: joi.string().required().email(),
        password: joi.string().required().min(8).max(32),
        country: joi.string().min(3).max(20)
    })
    
    const validate = schema.validate( req.body, {abortEarly : false} )
    
    if( validate.error ){
        return res.status(409).json( { errors : validate.error.details } )
    }
    
    next()
}
