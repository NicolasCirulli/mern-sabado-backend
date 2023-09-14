import Category from "../models/Category.js"

export const getCategories = async(_, res) => {
    try {
        const categories = await Category.find().populate({path: 'events',select : 'name image date description -_id'})
        if( !categories ){
            return res.status(404).json( { message: "Not Found: The requested resource could not be found on the server" } )
        }
        return res.status(200).json( { response:categories } )
    } catch (error) {
        return res.status(500).json( { message : "Internal Server Error"} )
    }
}
export const createCategory = async (req, res) =>{ 
    try {
        const newCategory = await Category.create( req.body )
        return res.status(201).json( { newCategory: newCategory } )
    } catch (error) {
        return res.status(500).json( { message : "Internal Server Error"} )
    }
}

export const getOneCategory = async ( req, res) => {
    try {
        const category = await Category.findById( req.params.id ).populate( {path : 'events',select : '-category'} )
        if( !category ){
            return res.status(404).json( { message: "Not Found: The requested resource could not be found on the server" } )
        }
        return res.status(200).json( { category: category } )
    } catch (error) {
        return res.status(500).json( { message : "Internal Server Error"} )
    }
}
