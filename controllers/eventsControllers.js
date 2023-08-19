import Event from '../models/Event.js'
import Category from '../models/Category.js'

export const getEvents = async (req, res) => {
    // obtener todos los eventos
    const query = {}
    if( req.query.name ){
       query.name = { $regex: req.query.name , $options: 'i'}
    }
    if( req.query.category ){
        const aux = await Category.findOne({ category: req.query.category })
        query.category = aux._id
    }
    try {
        const events = await Event.find( query )
        res.status(200).json({ status:200, success:true, response: events })
    } catch (error) {
        res.status(500).json({ message: error })
    }

}

export const getEvent = async (req, res) => {
    // obtener un evento
    try {
        
        const event = await Event.findById( req.params.id )

        res.json( event )

    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const createEvent = async (req, res) => {
    // crear un evento
    try {
        const newEvent = { ...req.body }

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
        res.status(500).json({ message: error })
    }

}

export const createEvents = async (req, res) => {
    try {
        for (const item of req.body) {
            const { category } = item
            const newEvent = { ...item }
            const aux = await Category.findOne({ category: category })

            if (aux) {
                newEvent.category = aux._id
            } else {
                const newCategory = await Category.create({ category: category })
                newEvent.category = newCategory._id
            }
            const event = await Event.create(newEvent)
            await Category.findOneAndUpdate({ category: category }, { $push: { events: event._id } })
        }
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

