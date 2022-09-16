import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Course", CourseSchema);

export default Post;
