import mongoose from 'mongoose';

const likesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
})

const tripSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: String,
    location: String,
    title: {type: String, required: true},
    text: String,
    photoUrl: String,
    likes: [likesSchema]
}, {
    timestamps: true
});


export default mongoose.model('Trip', tripSchema);