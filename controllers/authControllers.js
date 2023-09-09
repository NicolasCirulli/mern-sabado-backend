import User from '../models/User.js'
import bcrypt from 'bcryptjs'

export const signUp = async (req, res) => {
    try {
        const { name, email, image, password, country } = req.body

        const userInDB = await User.findOne( { email } )

        if( userInDB ){
            return res.status( 400 ).json( { error : "El email ya esta en uso", success: false } )
        }
        
        const passwordHash = bcrypt.hashSync( password, 10 ) 

        const newUser = await User.create( { name, email, image, password: passwordHash, country } )

        res.status(201).json( { user: newUser, success: true } )
        
    } catch (error) {
        res.status( 500 ).json( { error : error, success: false } )
    }
}


export const signIn = () => {

}

