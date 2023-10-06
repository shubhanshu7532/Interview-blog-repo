import mongoose from 'mongoose';

const ReplySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    commentId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    reply: {
        type: String,
        required: true
    }
});


const reply = mongoose.model('reply', ReplySchema);

export default reply;