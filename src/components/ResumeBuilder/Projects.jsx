import React from "react";
import { Rocket } from "lucide-react";

export default function Projects({ value = [], onChange = () => {}, errors = [] }) {
  const list = Array.isArray(value) ? value : [];

  const updateAt = (i, field, val) => {
    const next = list.map((it, idx) => (idx === i ? { ...it, [field]: val } : it));
    onChange(next);
  };
  const add = () => onChange([...list, { title: "", description: "", link: "" }]);
  const remove = (i) => onChange(list.filter((_, idx) => idx !== i));

  const fillExample = () =>
    onChange([
      {
        title: "Realtime Chat Platform",
        description:
          "Realtime chat app with Socket.io and React. Implemented presence, message persistence and optimistic UI; supported 2k concurrent users.",
        link: "https://github.com/example/realtime-chat",
      },
      {
        title: "Portfolio Website",
        description:
          "Personal portfolio built with Next.js - SEO-optimized, server-side rendering and a smooth project showcase.",
        link: "https://example.com",
      },
    ]);

  const rowError = (i) => (Array.isArray(errors) ? errors[i] || {} : {});

  return (
    <section className="cc-section" aria-labelledby="proj-heading">
      <div className="cc-section-header" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="cc-section-icon"><Rocket size={18} /></div>
          <div>
            <div id="proj-heading" className="cc-section-title">Projects</div>
            <div className="cc-section-sub">Selected projects - include links and one-line outcomes</div>
          </div>
        </div>

        <div>
          <button type="button" onClick={fillExample} className="cc-btn secondary">Fill example</button>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="cc-empty" style={{ padding: 10 }}>
          <div style={{ fontSize: 14, color: "#64748b" }}>No project entries yet. Use "Fill example" or add your own.</div>
        </div>
      ) : (
        list.map((p, i) => {
          const err = rowError(i);
          return (
            <div key={i} className="cc-item" style={{ marginBottom: 12 }}>
              <button
                type="button"
                className="cc-remove-icon"
                aria-label={`Remove project ${i + 1}`}
                onClick={() => remove(i)}
                title="Remove"
              >
                ✕
              </button>

              <div className="cc-grid md-2">
                <div>
                  <div className="cc-label">Title *</div>
                  <input
                    className={`cc-field ${err.title ? "invalid" : ""}`}
                    placeholder="Project title"
                    value={p.title || ""}
                    onChange={(e) => updateAt(i, "title", e.target.value)}
                  />
                  {err.title && <div className="field-error">{err.title}</div>}
                </div>

                <div>
                  <div className="cc-label">Link</div>
                  <input
                    className="cc-field"
                    placeholder="https://github.com/..."
                    value={p.link || ""}
                    onChange={(e) => updateAt(i, "link", e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: 10 }}>
                <div className="cc-label">Short description</div>
                <textarea
                  className="cc-field cc-textarea"
                  placeholder="One-line summary and tech stack (e.g. 'React, Node, Socket.io - handled 2k concurrent users')"
                  value={p.description || ""}
                  onChange={(e) => updateAt(i, "description", e.target.value)}
                />
              </div>
            </div>
          );
        })
      )}

      <div style={{ marginTop: 8 }}>
        <button type="button" onClick={add} className="cc-add">+ Add Project</button>
      </div>

      {errors && typeof errors === "string" && <div className="field-error" style={{ marginTop: 8 }}>{errors}</div>}
    </section>
  );
}
