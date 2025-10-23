export function validateEmail(email = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateResume(resume = {}) {
  const issues = {
    personal: {},
    education: [],
    experience: [],
    skills: {},
    projects: [],
  };

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
      if (Object.keys(rowErr).length > 0) issues.education.push(rowErr);
    });
  }

  if (Array.isArray(resume.experience) && resume.experience.length > 0) {
    resume.experience.forEach((ex) => {
      const rowErr = {};
      if (!ex.company?.trim()) rowErr.company = "Company required";
      if (!ex.role?.trim()) rowErr.role = "Role required";
      if (!ex.duration?.trim()) rowErr.duration = "Duration required";
      if (Object.keys(rowErr).length > 0) issues.experience.push(rowErr);
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
      if (Object.keys(rowErr).length > 0) issues.projects.push(rowErr);
    });
  }

  return issues;
}

export function hasErrors(validation = { personal: {}, education: [], experience: [], skills: {}, projects: [] }) {
  const pErr = Object.keys(validation.personal || {}).length > 0;
  const sErr = !!(validation?.skills?.list);
  const eduErr =
    (Array.isArray(validation.education) && validation.education.some((e) => Object.keys(e).length > 0)) ||
    (Array.isArray(validation.education) && validation.education.includes("Add at least one education entry"));
  const expErr = Array.isArray(validation.experience) && validation.experience.some((e) => Object.keys(e).length > 0);
  const projErr =
    (Array.isArray(validation.projects) && validation.projects.some((e) => Object.keys(e).length > 0)) ||
    (Array.isArray(validation.projects) && validation.projects.includes("Add at least one project"));
  return pErr || sErr || eduErr || expErr || projErr;
}