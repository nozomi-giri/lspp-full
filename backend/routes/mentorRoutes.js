const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const {
  getMentors,
  addMentor,
  updateMentor,
  deleteMentor,
} = require("../controllers/mentorController");

router.get("/", getMentors);
router.post("/", requireAuth, addMentor);
router.put("/:id", requireAuth, updateMentor);
router.delete("/:id", requireAuth, deleteMentor);
module.exports = router;
