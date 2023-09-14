import Category from "../models/Category.js"

export const getCategories = async(_, res) => {
    try {
        const categories = await Category.find().populate({path: 'events',select : 'name image date description -_id'})
        if( !categories ){
            return res.status(404).json( { response: [] } )
        }
        res.status(200).json( { response:categories } )
    } catch (error) {
        res.status(500).json( {error: error} )
    }
}
export const createCategory = async (req, res) =>{ 
    try {
        const newCategory = await Category.create( req.body )
        res.status(201).json( { newCategory: newCategory } )
    } catch (error) {
        res.status(500).json( error )
    }
}

export const getOneCategory = async ( req, res) => {
    try {
        const category = await Category.findById( req.params.id ).populate( {path : 'events',select : '-category'} )
        if( !category ){
            return res.status(404).json( { response: {} } )
        }
        res.status(200).json( { category: category } )
    } catch (error) {
        res.status(500).json( error )
    }
}
