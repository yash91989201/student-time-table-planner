import mongoose from "mongoose";
import Student from "../models/student";

mongoose.connect("mongodb://localhost:27017/coursePlanner");

export default async function handler(req, res) {
  const { rollNumber, password } = req.body;

  let studentData = await Student.findOne({ rollNumber: rollNumber });
  if (!studentData)
    return {
      sucess: false,
      message: "No Student Exists with the given roll number",
      data: null,
    };
  else if (studentData.password === password)
    return {
      success: true,
      message: "Login Successful",
      data: studentData,
    };

  res.status(200).json({ name: "codedamn" });
}
