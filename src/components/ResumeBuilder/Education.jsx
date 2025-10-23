import React from "react";
import { GraduationCap } from "lucide-react";
import { useResume } from "../../state/ResumeContext";

export default function Education() {
    const { state, actions, validation } = useResume();
    const list = Array.isArray(state.resume.education) ? state.resume.education : [];
    const errors = state.ui.touched ? validation.education : [];

    const updateAt = (i, field, val) =>
        actions.setSection("education", list.map((it, idx) => (idx === i ? { ...it, [field]: val } : it)));
    const add = () => actions.setSection("education", [...list, { institution: "", degree: "", year: "" }]);
    const remove = (i) => actions.setSection("education", list.filter((_, idx) => idx !== i));

    const fillExample = () => {
        actions.setSection("education", [
            {
                institution: "Dhirubhai Ambani University",
                degree: "B.Tech - Information and Communication Technology",
                year: "2023",
            },
        ]);
    };

    return (
        <section className="cc-section" aria-labelledby="edu-heading">
            <div
                className="cc-section-header"
                style={{ justifyContent: "space-between" }}
            >
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div className="cc-section-icon">
                        <GraduationCap size={20} />
                    </div>
                    <div>
                        <div id="edu-heading" className="cc-section-title">
                            Education
                        </div>
                        <div className="cc-section-sub">
                            Degrees, certifications and relevant coursework
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        type="button"
                        onClick={fillExample}
                        className="cc-btn secondary"
                    >
                        Fill example
                    </button>
                </div>
            </div>

            {list.length === 0 ? (
                <div className="cc-empty">
                    <div>
                        No education entries yet. Add one below or use "Fill example".
                    </div>
                </div>
            ) : (
                list.map((ed, i) => {
                    const rowErr = Array.isArray(errors) ? errors[i] || {} : {};
                    return (
                        <div key={i} className="cc-item" style={{ marginBottom: 12 }}>
                            <button
                                type="button"
                                className="cc-remove-icon"
                                aria-label={`Remove education entry ${i + 1}`}
                                onClick={() => remove(i)}
                                title="Remove"
                            >
                                ✕
                            </button>

                            <div className="cc-grid md-3">
                                <div>
                                    <div className="cc-label">Institution *</div>
                                    <input
                                        className={`cc-field ${rowErr.institution ? "invalid" : ""
                                            }`}
                                        placeholder="University or school"
                                        value={ed.institution || ""}
                                        onChange={(e) => updateAt(i, "institution", e.target.value)}
                                    />
                                    {rowErr.institution && (
                                        <div className="field-error">{rowErr.institution}</div>
                                    )}
                                </div>

                                <div>
                                    <div className="cc-label">Degree / Program *</div>
                                    <input
                                        className={`cc-field ${rowErr.degree ? "invalid" : ""}`}
                                        placeholder="B.Sc, B.Tech, M.Sc, Diploma..."
                                        value={ed.degree || ""}
                                        onChange={(e) => updateAt(i, "degree", e.target.value)}
                                    />
                                    {rowErr.degree && (
                                        <div className="field-error">{rowErr.degree}</div>
                                    )}
                                </div>

                                <div>
                                    <div className="cc-label">Year *</div>
                                    <input
                                        className={`cc-field ${rowErr.year ? "invalid" : ""}`}
                                        placeholder="e.g. 2023"
                                        value={ed.year || ""}
                                        onChange={(e) => updateAt(i, "year", e.target.value)}
                                    />
                                    {rowErr.year && (
                                        <div className="field-error">{rowErr.year}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })
            )}

            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button type="button" onClick={add} className="cc-add">
                    + Add Education
                </button>
                {typeof errors === "string" && (
                    <div className="field-error">{errors}</div>
                )}
            </div>
        </section>
    );
}
