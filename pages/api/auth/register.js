import connectDB from "../../../db/conn";
import Student from "../../../db/models/Student";

connectDB();

export default async function handler(req, res) {
  const { rollNumber, name, password } = req.body;
  try {
    const studentExists = await Student.findOne({ rollNumber });
    if (studentExists) throw new Error("Student already exists.");
    const newStudent = new Student({ rollNumber, name, password });
    newStudent.save();
    res
      .status(200)
      .json({ success: true, message: "New Student added to database." });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}
