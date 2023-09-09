import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' 
export const signUp = async (req, res) => {

    try {
        const { email, password } = req.body

        const userInDB = await User.findOne( {email} ) 

        if( userInDB ){
            return res.json( { success: false, error: "El email ya esta registrado" } )
        }

        const passwordHash = bcrypt.hashSync( password, 10 )

        const newObj = {...req.body}
        newObj.password = passwordHash

        const newUser = await User.create( newObj )

        const userResponse = { email: newUser.email, image: newUser.image, name: newUser.name, _id: newUser._id }

        const token = jwt.sign( {email: newUser.email}, process.env.SECRET_KEY, { expiresIn: '1h' } )

        return res.status(201).json( { success:true, user: userResponse, token : token } )

    } catch (error) {
        res.json( {success:false, error: error} )
    }

}

export const signIn = async (req, res) => {

    
    try {
        const { email, password } = req.body

        const userInDB = await User.findOne( {email} ) 

        if( !userInDB ){
            return res.json( { success: false, error: "Email o contraseña incorrecta" } )
        }

        const validPassword = bcrypt.compareSync( password, userInDB.password )

        if( !validPassword ){
            return res.json( { success: false, error: "Email o contraseña incorrecta" } )
        }

        const userResponse = { email: userInDB.email, image: userInDB.image, name: userInDB.name, _id: userInDB._id }

        const token = jwt.sign( {email: userInDB.email }, process.env.SECRET_KEY )

        return res.status(200).json( { success:true, user: userResponse, token : token } )

    } catch (error) {
        res.json( {success:false, error: error} )
    }

}

export const signInToken = ( req, res ) => {
    const userResponse = { email: req.user.email, image: req.user.image, name: req.user.name, _id: req.user._id }
    res.status(200).json( { success: true , user : userResponse } )
}
