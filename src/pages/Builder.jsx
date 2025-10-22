import React, { useMemo, useRef, useState, useEffect } from "react";
import PersonalInfo from "../components/ResumeBuilder/PersonalInfo";
import Education from "../components/ResumeBuilder/Education";
import Experience from "../components/ResumeBuilder/Experience";
import Skills from "../components/ResumeBuilder/Skills";
import Projects from "../components/ResumeBuilder/Projects";
import "../components/styles/resume.css";
import resumeImage from "../assets/image.png";

const EMPTY = {
    personal: { name: "", email: "", phone: "", location: "", summary: "" },
    education: [],
    experience: [],
    skills: [],
    projects: [],
};

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Builder() {
    const [resume, setResume] = useState(EMPTY);
    const [touched, setTouched] = useState(false);
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState(null);

    const setSection = (k, v) => setResume((r) => ({ ...r, [k]: v }));

    const validation = useMemo(() => {
        const issues = { personal: {}, education: [], experience: [], skills: {}, projects: [] };
        const p = resume.personal || {};
        if (!p.name?.trim()) issues.personal.name = "Full name is required";
        if (!p.email?.trim()) issues.personal.email = "Email is required";
        else if (!validateEmail(p.email.trim())) issues.personal.email = "Enter a valid email";

        if (!Array.isArray(resume.education) || resume.education.length === 0) {
            issues.education.push("Add at least one education entry");
        } else {
            resume.education.forEach((ed) => {
                const rowErr = {};
                if (!ed.institution?.trim()) rowErr.institution = "Institution required";
                if (!ed.degree?.trim()) rowErr.degree = "Degree required";
                if (!ed.year?.trim()) rowErr.year = "Year required";
                issues.education.push(rowErr);
            });
        }

        if (Array.isArray(resume.experience) && resume.experience.length > 0) {
            resume.experience.forEach((ex) => {
                const rowErr = {};
                if (ex.company !== undefined && ex.company !== null && String(ex.company).trim() === "") rowErr.company = "Company required";
                if (ex.role !== undefined && ex.role !== null && String(ex.role).trim() === "") rowErr.role = "Role required";
                if (ex.duration !== undefined && ex.duration !== null && String(ex.duration).trim() === "") rowErr.duration = "Duration required";
                issues.experience.push(rowErr);
            });
        }

        const skillsList = Array.isArray(resume.skills) ? resume.skills.filter(Boolean) : [];
        if (skillsList.length === 0) issues.skills.list = "Add at least one skill";

        if (!Array.isArray(resume.projects) || resume.projects.length === 0) {
            issues.projects.push("Add at least one project");
        } else {
            resume.projects.forEach((pjt) => {
                const rowErr = {};
                if (!pjt.title?.trim()) rowErr.title = "Title required";
                issues.projects.push(rowErr);
            });
        }

        return issues;
    }, [resume]);

    const hasErrors = useMemo(() => {
        const pErr = Object.keys(validation.personal).length > 0;
        const sErr = !!validation.skills.list;
        const eduErr = validation.education.some((e) => Object.keys(e).length > 0) || validation.education.includes("Add at least one education entry");
        const expErr = validation.experience.some((e) => Object.keys(e).length > 0);
        const projErr = validation.projects.some((e) => Object.keys(e).length > 0) || validation.projects.includes("Add at least one project");
        return pErr || sErr || eduErr || expErr || projErr;
    }, [validation]);

    const handleSend = async (e) => {
        e?.preventDefault();
        setTouched(true);
        setMessage(null);
        if (hasErrors) {
            setMessage({ type: "error", text: "Please fill all required details before sending." });
            return;
        }
        setSending(true);
        try {
            await new Promise((res) => setTimeout(res, 700));
            console.log("Resume payload:", resume);
            setMessage({ type: "success", text: "Resume sent successfully" });
        } catch (err) {
            setMessage({ type: "error", text: "Failed to send. Try again." });
        } finally {
            setSending(false);
        }
    };

    const personalRef = useRef(null);
    const educationRef = useRef(null);
    const experienceRef = useRef(null);
    const skillsRef = useRef(null);
    const projectsRef = useRef(null);

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
        validation.experience.length === resume.experience.length &&
        validation.experience.every((e) => Object.keys(e).length === 0);
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
                        <PersonalInfo value={resume.personal} onChange={(v) => setSection("personal", v)} errors={touched ? validation.personal : {}} />
                    </div>

                    <div ref={educationRef}>
                        <Education value={resume.education} onChange={(v) => setSection("education", v)} errors={touched ? validation.education : []} />
                    </div>

                    <div ref={experienceRef}>
                        <Experience value={resume.experience} onChange={(v) => setSection("experience", v)} errors={touched ? validation.experience : []} />
                    </div>

                    <div ref={skillsRef}>
                        <Skills value={resume.skills} onChange={(v) => setSection("skills", v)} errors={touched ? validation.skills : {}} />
                    </div>

                    <div ref={projectsRef}>
                        <Projects value={resume.projects} onChange={(v) => setSection("projects", v)} errors={touched ? validation.projects : []} />
                    </div>

                    <div className="form-actions">
                        <button className="cc-btn primary" type="submit" disabled={sending || (touched && hasErrors)}>
                            {sending ? "Sending…" : "Send Resume"}
                        </button>

                        <button
                            type="button"
                            className="cc-btn secondary"
                            onClick={() => {
                                setResume(EMPTY);
                                setTouched(false);
                                setMessage(null);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                        >
                            Reset
                        </button>


                    </div>

                    {message && <div className={`submit-message ${message.type === "success" ? "msg-success" : "msg-error"}`}>{message.text}</div>}
                </form>

                <aside className="builder-preview" aria-label="Live preview">
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
