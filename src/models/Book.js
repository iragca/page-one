import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
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

bookSchema.index({ title: 1 });
bookSchema.index({ author: 1 });
bookSchema.index({ genre: 1 });

const Book = mongoose.model('Book', bookSchema);

export { Book };