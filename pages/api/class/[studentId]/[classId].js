import { deleteClassFromStudent } from "../../../../db/utils/Classes";

export default async function handler(req, res) {
  try {
    const { studentId, classId } = req.query;
    const { status, message, data } = await deleteClassFromStudent(
      studentId,
      classId
    );
    if (status) res.status(200).json({ status, message, data });
    else res.status(404).json({ status, message, data });
  } catch (error) {}
}
