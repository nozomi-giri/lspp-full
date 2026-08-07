import { useEffect, useState } from "react";
import api from "../api/api";
import type { FAQItem } from "../types";

const emptyForm = { question: "", answer: "" };

function AdminFaqs() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadFaqs = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/faqs");
      setFaqs(res.data);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount
    loadFaqs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;

    try {
      await api.delete(`/faqs/${id}`);
      loadFaqs();
    } catch (err) {
      console.log(err);
      alert("Could not delete FAQ");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startEdit = (faq: FAQItem) => {
    setEditingId(faq._id);
    setForm({ question: faq.question, answer: faq.answer });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/faqs/${editingId}`, form);
      } else {
        await api.post("/faqs", form);
      }
      cancelEdit();
      loadFaqs();
    } catch (err) {
      console.log(err);
      alert("Could not save FAQ");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-3 rounded-card border border-border bg-card-bg p-5"
      >
        <h3 className="font-semibold text-text">
          {editingId ? "Edit FAQ" : "Add FAQ"}
        </h3>

        <input
          name="question"
          value={form.question}
          onChange={handleChange}
          placeholder="Question"
          required
          className="rounded-card border border-border bg-bg px-3 py-2 text-sm text-text"
        />
        <textarea
          name="answer"
          value={form.answer}
          onChange={handleChange}
          placeholder="Answer"
          required
          rows={3}
          className="rounded-card border border-border bg-bg px-3 py-2 text-sm text-text"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-card bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            {editingId ? "Save Changes" : "Add FAQ"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-card border border-border px-4 py-2 text-sm font-medium text-text"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading && (
        <p className="text-center text-sm text-text-muted">Loading FAQs...</p>
      )}

      {!loading && error && (
        <p className="text-center text-sm text-text-muted">
          Couldn't load FAQs right now. Please try again later.
        </p>
      )}

      {!loading && !error && faqs.length === 0 && (
        <p className="text-center text-sm text-text-muted">
          No FAQs added yet.
        </p>
      )}

      {!loading && !error && faqs.length > 0 && (
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="flex items-center justify-between rounded-card border border-border bg-card-bg px-5 py-3"
            >
              <div>
                <p className="font-semibold text-text">{faq.question}</p>
                <p className="text-sm text-text-muted">{faq.answer}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="rounded-card border border-border px-3 py-1.5 text-sm font-medium text-text transition-colors duration-200 hover:border-primary"
                  onClick={() => startEdit(faq)}
                >
                  Edit
                </button>
                <button
                  className="rounded-card border border-border px-3 py-1.5 text-sm font-medium text-accent transition-colors duration-200 hover:border-accent"
                  onClick={() => handleDelete(faq._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminFaqs;
