const Faq = require("../models/Faq");

const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json(faqs);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch faqs" });
  }
};

const addFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFaq = await Faq.create({ question, answer });
    res.status(201).json(newFaq);
  } catch (err) {
    res.status(500).json({ message: "Could not add faq" });
  }
};

const updateFaq = async (req, res) => {
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedFaq) {
      return res.status(404).json({ message: "Faq not found" });
    }

    res.status(200).json(updatedFaq);
  } catch (err) {
    res.status(500).json({ message: "Could not update faq" });
  }
};

const deleteFaq = async (req, res) => {
  try {
    const deletedFaq = await Faq.findByIdAndDelete(req.params.id);

    if (!deletedFaq) {
      return res.status(404).json({ message: "Faq not found" });
    }

    res.status(200).json({ message: "Faq deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete faq" });
  }
};

module.exports = { getFaqs, addFaq, updateFaq, deleteFaq };
