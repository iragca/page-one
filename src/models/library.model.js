import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please insert Title'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Please insert Author']
    },
    genre: {
        type: String,
        required: [true, 'Please insert Genre else Others']
    },
    year_published: {
        type: Number,
        min: [1440, "There's no printing press yet silly!"],
        max: [new Date().getFullYear(), 'Did you just time travelled?']
    },
    publisher: {
        type: String,
        required: [true, 'Please insert Publisher else Others']
    },
    isbn_issn: {
        type: String,
        required: true,
        unique: true
    },
    cover_photo: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

librarySchema.index({ title: 1 });
librarySchema.index({ author: 1 });
librarySchema.index({ genre: 1 });

const libraryModel = mongoose.model('Library', librarySchema)

export default libraryModel;