import React, { useState } from "react";
import { Brain } from "lucide-react";

export default function Skills({
  value = [],
  onChange = () => {},
  errors = {},
}) {
  const list = Array.isArray(value) ? value : [];
  const [quick, setQuick] = useState("");

  const updateAt = (i, val) =>
    onChange(list.map((s, idx) => (idx === i ? val : s)));
  const remove = (i) => onChange(list.filter((_, idx) => idx !== i));
  const quickAdd = () => {
    const parts = quick
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.length) return;
    const uniq = parts.filter(
      (p) => !list.map((x) => x && x.toLowerCase()).includes(p.toLowerCase())
    );
    if (!uniq.length) {
      setQuick("");
      return;
    }
    onChange([...list, ...uniq]);
    setQuick("");
  };

  const fillExample = () => {
    onChange([
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "Git",
    ]);
  };

  return (
    <section className="cc-section" aria-labelledby="skills-heading">
      <div
        className="cc-section-header between"
        style={{ justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="cc-section-icon">
            <Brain size={20} />
          </div>
          <div>
            <div id="skills-heading" className="cc-section-title">
              Skills
            </div>
            <div className="cc-section-sub">
              Primary technical skills - add important ones first
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            type="button"
            onClick={fillExample}
            className="cc-btn secondary"
          >
            Fill example
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {list.map((s, i) => (
          <div
            key={i}
            className="cc-item skill-row"
            style={{ marginBottom: 6 }}
          >
            <button
              type="button"
              className="cc-remove-icon cc-remove-icon-skill"
              aria-label={`Remove skill ${i + 1}`}
              onClick={() => remove(i)}
              title="Remove"
            >
              ✕
            </button>

            <div
              style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}
            >
              <input
                className={`cc-field ${errors[`s${i}`] ? "invalid" : ""}`}
                value={s || ""}
                onChange={(e) => updateAt(i, e.target.value)}
                placeholder="e.g. React, Python"
              />
            </div>
          </div>
        ))}

        <div className="cc-helper">
          Quick add: comma separated (e.g. React,Node,Docker)
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            className="cc-field"
            value={quick}
            onChange={(e) => setQuick(e.target.value)}
            placeholder="React,Node,SQL..."
          />
          <button type="button" onClick={quickAdd} className="cc-btn primary">
            Add
          </button>
        </div>

        {errors && errors.list && (
          <div className="field-error">{errors.list}</div>
        )}
      </div>
    </section>
  );
}
