const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const {
  getFaqs,
  addFaq,
  updateFaq,
  deleteFaq,
} = require("../controllers/faqController");

router.get("/", getFaqs);
router.post("/", requireAuth, addFaq);
router.put("/:id", requireAuth, updateFaq);
router.delete("/:id", requireAuth, deleteFaq);

module.exports = router;
