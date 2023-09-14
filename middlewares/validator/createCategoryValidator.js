import joi from 'joi'

export const createCategoryValidator = (req, res, next) =>{

    const schema = joi.object( {
        category: joi.string().required(),
        description: joi.string().default('no description'),
    })
    
    const validate = schema.validate( req.body, {abortEarly : false} )
    
    if( validate.error ){
        return res.json( {success:false, errors : validate.error.details } )
    }
    
    next()
}
