import mongoose from "mongoose";

function connectDB() {
  // if (mongoose.connections.length > 0) return mongoose.connections[0];

  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err));
}

export default connectDB;
