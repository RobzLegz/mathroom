import mongoose from "mongoose";

const levelSchema = new mongoose.Schema({
    difficulty: {
        type: Number,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    instruction: {
        type: String,
        default: false,
    },
    correctValue: {
        type: Number,
        default: false,
    },
    author: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

let Dataset = mongoose.models.level || mongoose.model("level", levelSchema);
export default Dataset;