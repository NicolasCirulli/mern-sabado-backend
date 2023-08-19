import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    category: { type: String, required: true, unique: true },
    description: { type: String, default: "sin descripcion"},
    events : [ { type: mongoose.Types.ObjectId, ref: 'Event' } ]
})

const Category = mongoose.model( 'Category', categorySchema )

export default Category