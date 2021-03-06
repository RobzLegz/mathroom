import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/ddqddw48c/image/upload/v1631371597/app/account_bza2zk.svg"
    },
    level: {
        type: Number,
        default: 1
    },
    passedLevels: {
        type: Array,
        default: []
    },
}, {
    timestamps: true
});

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;