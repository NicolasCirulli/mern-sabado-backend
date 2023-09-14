import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true, unique:true },
    image: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
    place: { type: String, required: true },
    capacity: { type: Number, required: true },
    assistance: { type: Number },
    estimate : { type: Number},
    price: { type: Number, required: true },
})

const Event = mongoose.model( 'Event', eventSchema )

export default Event
