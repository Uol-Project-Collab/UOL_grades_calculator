const { db } = require('../config/firebase');

exports.updateAverageGrade = async (req, res) => {
  const studentId = req.user.uid;
  const { averageGrade } = req.body;
  if (averageGrade === undefined || isNaN(averageGrade)) {
    return res.status(400).json({ error: 'Invalid average grade' });
  }
  await db.collection('students').doc(studentId).update({ averageGrade, lastUpdated: new Date().toISOString() });
  res.json({ success: true, averageGrade });
};

exports.getOrCreateAverage = async (req, res) => {
  const studentId = req.user.uid;
  const ref = db.collection('students').doc(studentId);
  const doc = await ref.get();
  if (!doc.exists) return res.status(404).json({ error: 'Student not found' });
  const data = doc.data();
  if (data.averageGrade !== undefined) return res.json({ averageGrade: data.averageGrade });
  const modules = data.modules || [];
  const avg = modules.length ? modules.reduce((sum, m) => sum + m.grade, 0) / modules.length : 0;
  await ref.update({ averageGrade: avg });
  res.json({ averageGrade: +avg.toFixed(2) });
};
