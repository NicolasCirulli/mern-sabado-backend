import Event from '../models/Event.js'
import Category from '../models/Category.js'

export const getEvents = async (req, res) => {
    const query = ['name','description'].reduce( ( query, key ) => {
        if( req.query[key] ) query[key] = { $regex: req.query[key] , $options: 'i'}
        return query
    }, {} )
    if( req.query.category ) query.category = req.query.category
    try {
        const events = await Event.find( query ).populate( {path: 'category',select : 'category description -_id'} )
        if( !events ){
            return res.status(404).json( { message: "Not Found: The requested resource could not be found on the server" } )
        }
        res.status(200).json({response: events })
    } catch (error) {
        return res.status(500).json( { message : "Internal Server Error"} )
    }
}

export const getEvent = async (req, res) => {
    try {
        const event = await Event.findById( req.params.id ).populate( {path: 'category',select : 'category description -_id'} )
        if( !event ){
            return res.status(404).json( { message: "Not Found: The requested resource could not be found on the server" } )
        }
        return res.status(200).json({ response: event })
    } catch (error) {
        return res.status(500).json( { message : "Internal Server Error"} )
    }
}

export const createEvent = async (req, res) => {
    try {
        const newEvent = { ...req.body }
        const eventExist = await Event.findOne( {name:req.body.name} )
        if( eventExist ){
            return res.status(409).json( { message: `This name is already use`, id_event: eventExist._id } )
        }
        const category = await Category.findOne({ category: req.body.category })
        if (category) {
            newEvent.category = category._id
        } else {
            const newCategory = await Category.create({ category: req.body.category })
            newEvent.category = newCategory._id
        }
        const event = await Event.create(newEvent)
        await Category.findOneAndUpdate({ _id: newEvent.category }, { $push: { events: event._id } })
        res.status(201).json({ newEvent: event })
    } catch (error) {
        return res.status(500).json( { message : "Internal Server Error"} )
    }

}



