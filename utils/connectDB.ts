import mongoose from "mongoose"

const connectDB = () => {
    const DB_URL: string | undefined = process.env.MONGODB_URL;

    if(mongoose.connections[0].readyState){
        console.log("Already connected");
        return;
    }

    if(DB_URL){
        mongoose.connect(DB_URL, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, (err) => {
            if(err) throw err;
            console.log("Connected to DB");
        });
    }
}


export default connectDB