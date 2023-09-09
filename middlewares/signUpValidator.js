import joi from 'joi'

export const signUpValidator = (req, res, next) =>{

    const schema = joi.object( {
        name : joi.string().min( 3 ).max( 10 ).required().messages({
            'string.name' : "El campo nombre debería ser un texto",
            'string.empty' : "El campo nombre es requerido",
            "string.min" : "El campo nombre requiere 3 caracteres como minimo"
        }),
        image : joi.string().required().uri(),
        email : joi.string().required().email(),
        password : joi.string().min(8).max(16).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        country : joi.string().min(3).max(20)
    } )
    
    const validate = schema.validate( req.body, {abortEarly : false} )
    
    if( validate.error ){
        return res.json( {success:false, errors : validate.error.details } )
    }
    
    next()
}
