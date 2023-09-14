import joi from 'joi'

export const createEventValidator = (req, res, next) =>{

    const schema = joi.object( {
        name: joi.string().required(),
        image: joi.string().required().uri(),
        date: joi.string().required(),
        description: joi.string().required(),
        category: joi.string().required(),
        place: joi.string().required(),
        capacity: joi.number().required(),
        assistance: joi.number(),
        estimate: joi.number(),
        price: joi.number().required(),
    })
    
    const validate = schema.validate( req.body, {abortEarly : false} )
    
    if( validate.error ){
        return res.json( {success:false, errors : validate.error.details } )
    }
    
    next()
}
