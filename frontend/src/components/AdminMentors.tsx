import { useEffect, useState } from "react";
import api from "../api/api";
import type { Mentor } from "../types";

const emptyForm = { name: "", role: "", image: "", bio: "" };

function AdminMentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadMentors = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.get("/mentors");
      setMentors(res.data);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard fetch-on-mount
    loadMentors();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this mentor?")) return;

    try {
      await api.delete(`/mentors/${id}`);
      loadMentors();
    } catch (err) {
      console.log(err);
      alert("Could not delete mentor");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const startEdit = (mentor: Mentor) => {
    setEditingId(mentor._id);
    setForm({
      name: mentor.name,
      role: mentor.role,
      image: mentor.image,
      bio: mentor.bio,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/mentors/${editingId}`, form);
      } else {
        await api.post("/mentors", form);
      }
      cancelEdit();
      loadMentors();
    } catch (err) {
      console.log(err);
      alert("Could not save mentor");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-col gap-3 rounded-card border border-border bg-card-bg p-5"
      >
        <h3 className="font-semibold text-text">
          {editingId ? "Edit Mentor" : "Add Mentor"}
        </h3>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="rounded-card border border-border bg-bg px-3 py-2 text-sm text-text"
        />
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          required
          className="rounded-card border border-border bg-bg px-3 py-2 text-sm text-text"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="rounded-card border border-border bg-bg px-3 py-2 text-sm text-text"
        />
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Bio"
          required
          rows={3}
          className="rounded-card border border-border bg-bg px-3 py-2 text-sm text-text"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-card bg-primary px-4 py-2 text-sm font-medium text-white"
          >
            {editingId ? "Save Changes" : "Add Mentor"}
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
        <p className="text-center text-sm text-text-muted">
          Loading mentors...
        </p>
      )}

      {!loading && error && (
        <p className="text-center text-sm text-text-muted">
          Couldn't load mentors right now. Please try again later.
        </p>
      )}

      {!loading && !error && mentors.length === 0 && (
        <p className="text-center text-sm text-text-muted">
          No mentors added yet.
        </p>
      )}

      {!loading && !error && mentors.length > 0 && (
        <div className="flex flex-col gap-3">
          {mentors.map((mentor) => (
            <div
              key={mentor._id}
              className="flex items-center justify-between rounded-card border border-border bg-card-bg px-5 py-3"
            >
              <div>
                <p className="font-semibold text-text">{mentor.name}</p>
                <p className="text-sm text-text-muted">{mentor.role}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="rounded-card border border-border px-3 py-1.5 text-sm font-medium text-text transition-colors duration-200 hover:border-primary"
                  onClick={() => startEdit(mentor)}
                >
                  Edit
                </button>
                <button
                  className="rounded-card border border-border px-3 py-1.5 text-sm font-medium text-accent transition-colors duration-200 hover:border-accent"
                  onClick={() => handleDelete(mentor._id)}
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

export default AdminMentors;
