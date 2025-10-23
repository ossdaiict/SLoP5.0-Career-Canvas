import React from "react";
import { Briefcase } from "lucide-react";

export default function Experience({ value = [], onChange = () => { }, errors = [] }) {
    const list = Array.isArray(value) ? value : [];

    const updateAt = (i, field, val) => onChange(list.map((it, idx) => (idx === i ? { ...it, [field]: val } : it)));
    const add = () => onChange([...list, { company: "", role: "", duration: "", highlights: [] }]);
    const remove = (i) => onChange(list.filter((_, idx) => idx !== i));

    const fillExample = () => {
        onChange([
            {
                company: "Tech Solutions Pvt. Ltd.",
                role: "Software Engineer",
                duration: "Jul 2021 - Present",
                highlights: [
                    "Built and maintained customer-facing web apps using React and Node.js.",
                    "Improved page load time by 40% and reduced error rate with robust monitoring."
                ]
            },
        ]);
    };

    return (
        <section className="cc-section" aria-labelledby="exp-heading">
            <div className="cc-section-header" style={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div className="cc-section-icon"><Briefcase size={20} /></div>
                    <div>
                        <div id="exp-heading" className="cc-section-title">Experience</div>
                        <div className="cc-section-sub">Professional roles, internships or volunteer work (optional)</div>
                    </div>
                </div>

                <div>
                    <button type="button" onClick={fillExample} className="cc-btn secondary">Fill example</button>
                </div>
            </div>

            {list.length === 0 ? (
                <div className="cc-empty">No experience entries yet - add below or use example.</div>
            ) : (
                list.map((ex, i) => {
                    const rowErr = Array.isArray(errors) ? errors[i] || {} : {};
                    return (
                        <div key={i} className="cc-item" style={{ marginBottom: 12 }}>
                            <button
                                type="button"
                                className="cc-remove-icon"
                                aria-label={`Remove experience ${i + 1}`}
                                onClick={() => remove(i)}
                                title="Remove"
                            >
                                ✕
                            </button>

                            <div className="cc-grid md-3">
                                <div>
                                    <div className="cc-label">Company</div>
                                    <input
                                        className={`cc-field ${rowErr.company ? "invalid" : ""}`}
                                        placeholder="Company name"
                                        value={ex.company || ""}
                                        onChange={(e) => updateAt(i, "company", e.target.value)}
                                    />
                                    {rowErr.company && <div className="field-error">{rowErr.company}</div>}
                                </div>

                                <div>
                                    <div className="cc-label">Role</div>
                                    <input
                                        className={`cc-field ${rowErr.role ? "invalid" : ""}`}
                                        placeholder="Role / title"
                                        value={ex.role || ""}
                                        onChange={(e) => updateAt(i, "role", e.target.value)}
                                    />
                                    {rowErr.role && <div className="field-error">{rowErr.role}</div>}
                                </div>

                                <div>
                                    <div className="cc-label">Duration</div>
                                    <input
                                        className={`cc-field ${rowErr.duration ? "invalid" : ""}`}
                                        placeholder="e.g. Jun 2020 - Jul 2022"
                                        value={ex.duration || ""}
                                        onChange={(e) => updateAt(i, "duration", e.target.value)}
                                    />
                                    {rowErr.duration && <div className="field-error">{rowErr.duration}</div>}
                                </div>
                            </div>

                            <div style={{ marginTop: 10 }}>
                                <div className="cc-label">Highlights</div>
                                <textarea
                                    className="cc-field cc-textarea"
                                    placeholder="Short bullets or summary of contributions - e.g. 'Reduced API latency by 25%'"
                                    value={Array.isArray(ex.highlights) ? ex.highlights.join("\n") : (ex.highlights || "")}
                                    onChange={(e) =>
                                        updateAt(
                                            i,
                                            "highlights",
                                            e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)
                                        )
                                    }
                                />
                                <div className="cc-helper">Enter one bullet per line. These appear in preview as short highlights.</div>
                            </div>
                        </div>
                    );
                })
            )}

            <div style={{ marginTop: 8 }}>
                <button type="button" onClick={add} className="cc-add">+ Add Experience</button>
            </div>
        </section>
    );
}
