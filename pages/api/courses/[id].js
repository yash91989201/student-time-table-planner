import { getClasses } from "../../../db/utils/Classes";
import { addClassToStudent } from "../../../db/utils/Classes";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET": {
        const { id: courseCode } = req.query;
        const { status, message, data } = await getClasses(courseCode);
        res.status(200).json({ status, message, data });
        break;
      }
      case "POST": {
        const { id: studentId } = req.query;
        const { courseId } = req.body;
        const { status, message, data } = await addClassToStudent(
          studentId,
          courseId
        );
        res.status(200).json({ status, message, data });
        break;
      }
    }
  } catch (error) {
    res.status(404).json({ status, message, data });
  }
}
