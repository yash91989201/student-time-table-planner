import bcrypt from "bcrypt";
import connect from "../conn";

import Student from "../models/Student";

// make connection with database
connect();

async function studentRegister(studentData) {
  try {
    const { rollNo, name, classes, password } = studentData;
    const studentExists = await Student.find({ rollNo });
    // create a new student if rollNo doesnot existss
    if (studentExists.length == 0) {
      console.log(studentExists);
      const newStudent = new Student({
        rollNo,
        name,
        classes,
        password,
      });
      newStudent.save();
      return {
        status: true,
        message: "New Student Added",
        data: newStudent,
      };
    }
    return {
      status: false,
      message: "Student already exists",
      data: null,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: null,
    };
  }
}

async function studentLogin(credentials) {
  try {
    const { rollNo, password } = credentials;
    const studentData = await Student.findOne({ rollNo });
    if (studentData) {
      const isMatch = await bcrypt.compare(password, studentData.password);
      if (isMatch) {
        return {
          success: true,
          message: "Student login successful",
          data: {
            rollNo: studentData.rollNo,
            name: studentData.name,
            classes: studentData.classes,
          },
        };
      } else
        return {
          success: false,
          message: "Invalid Login Credentials",
          data: null,
        };
    }
    return {
      status: false,
      message: "Student doesnot exists in our database",
      data: null,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: null,
    };
  }
}

async function getStudentClasses(studentId) {
  try {
    const res = await Student.findOne({ _id: studentId }, { classes: true });
    return {
      status: true,
      message: "Fetched all classes",
      data: res,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: null,
    };
  }
}

export { studentRegister, studentLogin, getStudentClasses };
