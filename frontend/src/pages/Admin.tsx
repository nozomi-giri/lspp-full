import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminMentors from "../components/AdminMentors";
import AdminFaqs from "../components/AdminFaqs";
import AdminLogin from "../components/AdminLogin";

function Admin() {
  const [activeTab, setActiveTab] = useState<"mentors" | "faqs">("mentors");
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("adminToken")
  );

  return (
    <div>
      <Navbar />

      <section className="mx-auto max-w-[900px] px-8 py-16">
        <h1 className="mb-8 text-center text-3xl text-primary">
          Admin Dashboard
        </h1>

        {!loggedIn && <AdminLogin onLogin={() => setLoggedIn(true)} />}

        {loggedIn && (
          <>
            <div className="mb-8 flex justify-center gap-4">
              <button
                className={`rounded-card border border-border px-5 py-2 font-medium transition-colors duration-200 ${
                  activeTab === "mentors"
                    ? "bg-primary text-white"
                    : "bg-card-bg text-text"
                }`}
                onClick={() => setActiveTab("mentors")}
              >
                Mentors
              </button>
              <button
                className={`rounded-card border border-border px-5 py-2 font-medium transition-colors duration-200 ${
                  activeTab === "faqs"
                    ? "bg-primary text-white"
                    : "bg-card-bg text-text"
                }`}
                onClick={() => setActiveTab("faqs")}
              >
                FAQs
              </button>
            </div>
            {activeTab === "mentors" && <AdminMentors />}
            {activeTab === "faqs" && <AdminFaqs />}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Admin;
