const Mentor = require("../models/Mentor");

// GET /api/mentors
const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch mentors" });
  }
};

// POST /api/mentors
const addMentor = async (req, res) => {
  try {
    const { name, role, image, bio } = req.body;

    if (!name || !role || !image || !bio) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMentor = await Mentor.create({ name, role, image, bio });
    res.status(201).json(newMentor);
  } catch (err) {
    res.status(500).json({ message: "Could not add mentor" });
  }
};

// PUT /api/mentors/:id
const updateMentor = async (req, res) => {
  try {
    const updatedMentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedMentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.status(200).json(updatedMentor);
  } catch (err) {
    res.status(500).json({ message: "Could not update mentor" });
  }
};

// DELETE /api/mentors/:id
const deleteMentor = async (req, res) => {
  try {
    const deletedMentor = await Mentor.findByIdAndDelete(req.params.id);

    if (!deletedMentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }

    res.status(200).json({ message: "Mentor deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete mentor" });
  }
};

module.exports = { getMentors, addMentor, updateMentor, deleteMentor };
