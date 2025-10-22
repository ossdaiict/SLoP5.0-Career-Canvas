import React from "react";
import { User } from "lucide-react";

export default function PersonalInfo({ value = {}, onChange = () => {}, errors = {} }) {
  const v = { name: "", email: "", phone: "", location: "", summary: "", ...value };
  const handle = (e) => onChange({ ...v, [e.target.name]: e.target.value });

  const fillExample = () => {
    onChange({
      name: "Rudra Ali Gonsalves",
      email: "name.surname@example.com",
      phone: "+91 12345 67890",
      location: "Ahmedabad, Gujarat, India",
      summary:
        "Software engineer with 3+ years building web applications using React and Node.js. Focused on performance, maintainable code, and delivering user-centric features.",
    });
  };

  return (
    <section className="cc-section" aria-labelledby="personal-heading">
      <div className="cc-section-header" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="cc-section-icon"><User size={20} /></div>
          <div>
            <div id="personal-heading" className="cc-section-title">Personal Information</div>
            <div className="cc-section-sub">Basic contact details and a short summary recruiters read first</div>
          </div>
        </div>

        <div>
          <button type="button" onClick={fillExample} className="cc-btn secondary" style={{ fontWeight: 700 }}>
            Fill example
          </button>
        </div>
      </div>

      <div className="cc-grid md-2">
        <div>
          <div className="cc-label">Full name *</div>
          <input
            name="name"
            placeholder="e.g. Aarav Patel"
            className={`cc-field ${errors.name ? "invalid" : ""}`}
            value={v.name}
            onChange={handle}
            aria-invalid={!!errors.name}
          />
          {errors.name && <div className="field-error">{errors.name}</div>}
        </div>

        <div>
          <div className="cc-label">Email *</div>
          <input
            name="email"
            placeholder="you@example.com"
            className={`cc-field ${errors.email ? "invalid" : ""}`}
            value={v.email}
            onChange={handle}
            aria-invalid={!!errors.email}
          />
          {errors.email && <div className="field-error">{errors.email}</div>}
        </div>
      </div>

      <div className="cc-grid md-2" style={{ marginTop: 10 }}>
        <div>
          <div className="cc-label">Phone</div>
          <input name="phone" placeholder="+91 9xxxxxxxxx" className="cc-field" value={v.phone} onChange={handle} />
        </div>

        <div>
          <div className="cc-label">Location</div>
          <input
            name="location"
            placeholder="City, Country - e.g. Ahmedabad, India"
            className="cc-field"
            value={v.location}
            onChange={handle}
          />
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div className="cc-label">Professional summary</div>
        <textarea
          name="summary"
          className="cc-field cc-textarea"
          placeholder="2–3 lines: expertise, years of experience, main tech and outcome (e.g. 'Improved X by Y')"
          value={v.summary}
          onChange={handle}
        />
      </div>
    </section>
  );
}
