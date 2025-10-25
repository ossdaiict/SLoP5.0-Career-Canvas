import React, { useMemo, useRef, useState, useEffect } from "react";
import PersonalInfo from "../components/ResumeBuilder/PersonalInfo";
import Education from "../components/ResumeBuilder/Education";
import Experience from "../components/ResumeBuilder/Experience";
import Skills from "../components/ResumeBuilder/Skills";
import Projects from "../components/ResumeBuilder/Projects";
import "../components/styles/resume.css";
import resumeImage from "../assets/image.png";
import { ResumeProvider, useResume } from "../state/ResumeContext";
import { exportResumePDF } from "../utils/pdfExport";

function BuilderInner() {
    const { state, actions, validation, hasErrors } = useResume();
    const resume = state.resume;
    const touched = state.ui.touched;
    const sending = state.ui.sending;
    const message = state.ui.message;

    const handleSend = async (e) => {
        e?.preventDefault();
        actions.setTouched(true);
        actions.setMessage(null);
        if (hasErrors) {
            actions.setMessage({ type: "error", text: "Please fill all required details before sending." });
            return;
        }
        actions.setSending(true);
        try {
            await new Promise((res) => setTimeout(res, 700));
            console.log("Resume payload:", resume);
            actions.setMessage({ type: "success", text: "Resume sent successfully" });
        } catch (err) {
            actions.setMessage({ type: "error", text: "Failed to send. Try again." });
        } finally {
            actions.setSending(false);
        }
    };

    const personalRef = useRef(null);
    const educationRef = useRef(null);
    const experienceRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);
    const previewRef = useRef(null);

    const steps = [
        { id: "personal", label: "Personal", ref: personalRef },
        { id: "education", label: "Education", ref: educationRef },
        { id: "experience", label: "Experience", ref: experienceRef },
        { id: "skills", label: "Skills", ref: skillsRef },
        { id: "projects", label: "Projects", ref: projectsRef },
    ];

    const personalDone = Object.keys(validation.personal).length === 0;
    const educationDone = !(
        validation.education.includes("Add at least one education entry") ||
        validation.education.some((e) => Object.keys(e).length > 0)
    );
    const experienceDone =
        Array.isArray(resume.experience) &&
        resume.experience.length > 0 &&
        !validation.experience.some((e) => Object.keys(e).length > 0);
    const skillsDone = !validation.skills.list;
    const projectsDone = !(
        validation.projects.includes("Add at least one project") ||
        validation.projects.some((e) => Object.keys(e).length > 0)
    );
    const doneMap = { personal: personalDone, education: educationDone, experience: experienceDone, skills: skillsDone, projects: projectsDone };

    const goToStep = (ref) => {
        if (!ref || !ref.current) return;
        ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        const focusEl = ref.current.querySelector("input, textarea, button, [tabindex]");
        if (focusEl) focusEl.focus({ preventScroll: true });
    };

    const [stepperOffset, setStepperOffset] = useState(18);
    useEffect(() => {
        let rafId = null;
        const base = 18;

        const updateOffset = () => {
            const footer = document.querySelector("footer");
            if (!footer) {
                setStepperOffset(base);
                return;
            }
            const rect = footer.getBoundingClientRect();
            const overlap = Math.max(0, window.innerHeight - rect.top);
            setStepperOffset(base + overlap);
        };

        const onScrollOrResize = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                updateOffset();
                rafId = null;
            });
        };

        updateOffset();
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);
        const observer = new MutationObserver(onScrollOrResize);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="builder-root">
            <div className="cc-resume-container layout-grid">
                <header className="builder-header-card">
                    <div className="header-content">
                        <div className="builder-title">
                            <img
                                src={resumeImage}
                                alt="Resume Icon"
                                width={32}
                                height={32}
                                loading="lazy"
                                style={{ objectFit: "contain", marginRight: "8px" }}
                            />
                            Resume Builder
                        </div>
                        <p className="builder-sub">
                            Quickly craft a professional resume by completing each section to see your live preview update in real time.
                        </p>
                    </div>
                </header>



                <form className="builder-form" onSubmit={handleSend} noValidate>
                    <div ref={personalRef}>
                        <PersonalInfo />
                    </div>

                    <div ref={educationRef}>
                        <Education />
                    </div>

                    <div ref={experienceRef}>
                        <Experience />
                    </div>

                    <div ref={skillsRef}>
                        <Skills />
                    </div>

                    <div ref={projectsRef}>
                        <Projects />
                    </div>

                    <div className="form-actions">
                        <button className="cc-btn primary" type="submit" disabled={sending || (touched && hasErrors)}>
                            {sending ? "Sending…" : "Send Resume"}
                        </button>

                        <button
                            type="button"
                            className="cc-btn secondary"
                            onClick={() => {
                                actions.reset();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                        >
                            Reset
                        </button>


                    </div>

                    {message && <div className={`submit-message ${message.type === "success" ? "msg-success" : "msg-error"}`}>{message.text}</div>}
                </form>

                <aside className="builder-preview" aria-label="Live preview" ref={previewRef}>
                    <div className="preview-card">
                        <div className="preview-header">
                            <div>
                                <div className="preview-name">{resume.personal?.name || "Your Name"}</div>
                                <div className="preview-meta">{resume.personal?.email || "email@example.com"} • {resume.personal?.phone || "Phone"}</div>
                                <div className="preview-location">{resume.personal?.location || ""}</div>
                            </div>
                        </div>

                        <div className="preview-section">
                            <div className="preview-section-title">Summary</div>
                            <div className="preview-text">{resume.personal?.summary || "Write a short, punchy professional summary - it'll show here."}</div>
                        </div>

                        <div className="preview-section">
                            <div className="preview-section-title">Education</div>
                            {(resume.education || []).length === 0 ? (
                                <div className="muted">No education yet</div>
                            ) : (
                                resume.education.map((ed, i) => (
                                    <div key={i} className="preview-mini">
                                        <div className="preview-mini-title">{ed.institution} · {ed.degree}</div>
                                        <div className="preview-mini-sub">{ed.year}</div>
                                    </div>
                                ))
                            )}
                        </div>

                        {(resume.experience || []).length > 0 && (
                            <div className="preview-section">
                                <div className="preview-section-title">Experience</div>
                                {(resume.experience || []).map((ex, i) => (
                                    <div key={i} className="preview-mini">
                                        <div className="preview-mini-title">{ex.role || "Role"} · {ex.company || "Company"}</div>
                                        {ex.duration && <div className="preview-mini-sub">{ex.duration}</div>}
                                        {Array.isArray(ex.highlights) && ex.highlights.length > 0 && (
                                            <ul style={{ marginTop: 6, marginBottom: 6, paddingLeft: 16 }}>
                                                {ex.highlights.map((h, idx) => <li key={idx} style={{ fontSize: 13, color: "#475569" }}>{h}</li>)}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="preview-section">
                            <div className="preview-section-title">Projects</div>
                            {(resume.projects || []).length === 0 ? (
                                <div className="muted">No projects yet</div>
                            ) : (
                                resume.projects.map((p, i) => (
                                    <div key={i} className="preview-mini">
                                        <div className="preview-mini-title">{p.title}</div>
                                        {p.description && <div className="preview-mini-sub">{p.description}</div>}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="preview-section">
                            <div className="preview-section-title">Skills</div>
                            <div className="preview-chips">
                                {(resume.skills || []).filter(Boolean).length === 0 ? <span className="muted">Add skills</span> :
                                    (resume.skills || []).filter(Boolean).map((s, i) => <span key={i} className="chip">{s}</span>)
                                }
                            </div>
                        </div>

                        <div className="preview-foot">
                            <div className="muted small">This preview is live - it will not be sent to employers until you press "Send Resume".</div>
                        </div>

                        <button
                            type="button"
                            className="cc-btn primary"
                            disabled={(touched && hasErrors)}
                                style={{ marginTop: '12px', width: '100%' }}
                            onClick={() => {
                                actions.setTouched(true);
                                if (hasErrors && touched) {
                                    actions.setMessage({ type: "error", text: "Fix all errors before downloading PDF." });
                                    return;
                                }
                                exportResumePDF(previewRef, resume.personal?.name || "YourName");
                            }}
                        >
                            Download PDF
                        </button>

                    </div>
                </aside>

            </div>

            <nav className="floating-stepper" aria-label="Resume steps" style={{ bottom: `${stepperOffset}px` }}>
                {steps.map((st, idx) => {
                    const done = doneMap[st.id];
                    return (
                        <button
                            key={st.id}
                            type="button"
                            className={`step-btn ${done ? "done" : ""}`}
                            onClick={() => goToStep(st.ref)}
                            aria-label={`Go to ${st.label}`}
                            title={`${st.label}${done ? " - completed" : ""}`}
                        >
                            <span className="step-dot">{done ? "✓" : idx + 1}</span>
                            <span className="step-label">{st.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
}

export default function Builder() {
    return (
        <ResumeProvider>
            <BuilderInner />
        </ResumeProvider>
    );
}
