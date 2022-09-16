import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const StudentSchema = new mongoose.Schema({
  rollNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  classes: {
    type: [String],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: String,
    },
  ],
});

StudentSchema.pre("save", async function (next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 12);
  next();
});

StudentSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRETKEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(`Error in jwt token ${error.message}`);
  }
};

export default mongoose.models.Student ||
  mongoose.model("Student", StudentSchema);
