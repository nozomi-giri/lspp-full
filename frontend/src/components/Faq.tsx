import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import api from "../api/api";
import type { FAQItem } from "../types";

function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  function toggleFAQ(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section className="mx-auto max-w-[700px] px-8 py-16" id="faq">
      <h2 className="mb-10 text-center text-3xl text-primary">
        Frequently Asked Questions
      </h2>

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
        <div className="flex flex-col gap-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                className="overflow-hidden rounded-card border border-border border-l-[3px] border-l-accent bg-card-bg"
                key={item._id}
              >
                <button
                  className={`flex w-full items-center justify-between px-6 py-4 text-left font-semibold ${
                    isOpen ? "text-accent" : "text-text"
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-accent transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden px-6 transition-[max-height,padding] duration-300 ${
                    isOpen ? "max-h-[200px] pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-sm leading-relaxed text-text-muted">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default FAQ;
