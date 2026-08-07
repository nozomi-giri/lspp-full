import { useEffect, useState } from "react";
import { X } from "lucide-react";
import api from "../api/api";
import type { Mentor } from "../types";

export default function Mentors() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<Mentor | null>(null);

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

  return (
    <section className="bg-bg-secondary px-6 py-20" id="mentors">
      <div className="mx-auto mb-12 max-w-[760px] text-center">
        <p className="mb-2 text-xs uppercase tracking-[0.1em] text-accent">
          The people behind it
        </p>
        <h2 className="mb-3 text-[clamp(22px,3vw,28px)] font-semibold text-primary">
          Meet our mentors
        </h2>
        <p className="text-sm text-text-muted">
          The industry experts shaping the student partners to learn, lead and
          grow.
        </p>
      </div>

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
        <div className="mx-auto grid max-w-[900px] grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
          {mentors.map((mentor) => (
            <div
              className="group cursor-pointer text-center"
              key={mentor._id}
              onClick={() => setSelected(mentor)}
            >
              <div className="relative mb-2.5 aspect-[3/4] overflow-hidden rounded-card border border-border bg-card-bg">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="block text-[13px] font-semibold text-white">
                    {mentor.name}
                  </span>
                  <small className="mt-0.5 block text-[11px] text-white/75">
                    {mentor.role}
                  </small>
                  <small className="mt-1 line-clamp-3 text-[11px] leading-tight text-white/65">
                    {mentor.bio}
                  </small>
                </div>
              </div>
              <p className="mb-0.5 text-sm font-semibold text-text">
                {mentor.name}
              </p>
              <p className="text-xs leading-snug text-text-muted">
                {mentor.role}
              </p>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative flex w-full max-w-[480px] gap-6 rounded-card border border-border bg-card-bg p-6 max-[480px]:flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors duration-200 hover:border-text hover:text-text"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="aspect-[3/4] w-[130px] shrink-0 overflow-hidden rounded-card border border-border max-[480px]:aspect-[4/3] max-[480px]:w-full">
              <img
                src={selected.image}
                alt={selected.name}
                className="block h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-2 pr-6 max-[480px]:pr-0">
              <h3 className="text-lg font-semibold text-text">
                {selected.name}
              </h3>
              <p className="text-[13px] font-medium text-accent">
                {selected.role}
              </p>
              <p className="text-[13px] leading-relaxed text-text-muted">
                {selected.bio}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
