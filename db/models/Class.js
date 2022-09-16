import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

export default mongoose.models.Class || mongoose.model("Class", ClassSchema);
