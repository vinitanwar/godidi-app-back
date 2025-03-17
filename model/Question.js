import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    suggestions: [{ type: String }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// module.exports = mongoose.model('Question', questionSchema);
 const Question= mongoose.model("Question",questionSchema)
export default Question;