import bcrypt from "bcryptjs";
import cookie from "cookie";
import connectDB from "../../../db/conn";
import Student from "../../../db/models/Student";

connectDB();

export default async function handler(req, res) {
  const { rollNumber, password } = req.body;
  try {
    const studentExists = await Student.findOne({ rollNumber });
    if (!studentExists) throw new Error("Student doesnot exists.");
    const isPasswordMatch = await bcrypt.compare(
      password,
      studentExists.password
    );
    if (!isPasswordMatch) throw new Error("Invalid credentials.");
    let token = await studentExists.generateAuthToken();
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("jwtToken", token, {
        expires: new Date(Date.now() + 3600),
        httpOnly: true,
        path: "/",
      })
    );
    res.status(200).json({ success: true, message: "Login Successful" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}
