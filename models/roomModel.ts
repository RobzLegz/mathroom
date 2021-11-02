import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true
    },
    totalStages: {
        type: Number,
        default: 10,
    },
    maxPlayers: {
        type: Number,
        required: true
    },
    isPrivate: {
        type: Boolean,
        default: false,
    },
    hasStarted: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: String,
        required: true,
    },
    tasks: {
        type: Array,
        required: true,
    },
}, {
    timestamps: true
});

let Dataset = mongoose.models.room || mongoose.model("room", roomSchema);
export default Dataset;