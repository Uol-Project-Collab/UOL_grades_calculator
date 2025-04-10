const { db } = require("../config/firebase");

// (A) Update average grade (called by frontend)
const updateAverageGrade = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { averageGrade } = req.body;

    // Validate inputs
    if (!studentId || averageGrade === undefined || isNaN(averageGrade)) {
      return res.status(400).json({ error: "Invalid student ID or average grade" });
    }

    // Update Firestore
    const studentRef = db.collection("students").doc(studentId);
    await studentRef.update({
      averageGrade: Number(averageGrade),
      lastUpdated: new Date().toISOString()
    });

    res.status(200).json({ success: true, averageGrade });
  } catch (error) {
    console.error("Update average grade error:", error);
    res.status(500).json({ error: "Failed to update average grade" });
  }
};

// (B) Get or calculate average grade (fallback)
const getOrCreateAverage = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const studentRef = db.collection("students").doc(studentId);
    const studentDoc = await studentRef.get();

    if (!studentDoc.exists) {
      return res.status(404).json({ error: "Student not found" });
    }

    const studentData = studentDoc.data();
    
    // Return existing average grade if available
    if (studentData.averageGrade !== undefined) {
      return res.json({ averageGrade: studentData.averageGrade });
    }

    // Calculate from modules (fallback)
    const modules = Object.values(studentData.modules || {});
    const total = modules.reduce((sum, mod) => sum + mod.grade, 0);
    const calculatedAvg = modules.length > 0 
      ? (total / modules.length).toFixed(2) 
      : 0;

    // Save to Firestore (optional)
    await studentRef.update({ averageGrade: calculatedAvg });

    res.json({ averageGrade: calculatedAvg });
  } catch (error) {
    console.error("Get average grade error:", error);
    res.status(500).json({ error: "Failed to retrieve average grade" });
  }
};

module.exports = { updateAverageGrade, getOrCreateAverage };