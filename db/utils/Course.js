import connect from "../conn";
import Student from "../models/Student";
import Class from "../models/Class";

connect();

const getClasses = async (courseCode) => {
  try {
    const classesData = await Class.find({ courseCode });
    if (!classesData)
      return {
        success: false,
        message: "No classes exists with the given course code",
        data: null,
      };
    return {
      success: true,
      message: "Fetched classes for given course code",
      data: classesData,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

const addClassToStudent = async (studentId, classId) => {
  try {
    // get course code from course id
    const { courseCode } = await Class.findOne(
      { _id: classId },
      { courseCode: true }
    );
    const res = await Student.updateOne(
      { _id: studentId },
      { $addToSet: { classes: courseCode } }
    );
    return {
      status: true,
      message: "Added course to class",
      data: res,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: null,
    };
  }
};

const deleteClassFromStudent = async (studentId, classId) => {
  try {
    // get course code from course id
    const { courseCode } = await Class.findOne(
      { _id: classId },
      { courseCode: true }
    );
    const res = await Student.updateOne(
      { _id: studentId },
      { $pull: { classes: courseCode } }
    );
    return {
      status: true,
      message: "Removed class from student",
      data: res,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message,
      data: null,
    };
  }
};

export { getClasses, addClassToStudent, deleteClassFromStudent };
