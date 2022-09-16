import { getStudentClasses } from "../../../../db/utils/Student";

export default async function handler(req, res) {
  const { studentId } = req.query;
  const { status, message, data } = await getStudentClasses(studentId);
  if (status) res.status(200).json({ status, message, data });
  else res.status(404).json({ status, message, data });
}
