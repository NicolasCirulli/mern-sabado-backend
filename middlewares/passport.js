import passport from 'passport'
import { Strategy,ExtractJwt } from 'passport-jwt'
import User from '../models/User.js'
const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_KEY
}
const fn = async ( jwt_payload, done ) => {
    try{
        const user = await User.findOne( { email: jwt_payload.email } )
        if( !user ){
            done( null, false )
        }
        done( null, user )
    }catch(err){
        done( err, false )
    }
}
export default passport.use( new Strategy( options, fn ) )