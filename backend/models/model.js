import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
    bookId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    year_published: {
        type: Number
    },
    publisher: {
        type: String,
        required: true
    },
    isbn_issn: {
        type: String,
        required: true
    },
    cover_photo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const libraryModel = mongoose.model('Library', librarySchema)

export default libraryModel;