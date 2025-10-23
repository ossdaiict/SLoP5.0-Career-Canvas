export const ACTIONS = {
  SET_SECTION: "SET_SECTION",
  SET_RESUME: "SET_RESUME",
  RESET: "RESET",
  AUTOFILL: "AUTOFILL",
  SET_TOUCHED: "SET_TOUCHED",
  SET_SENDING: "SET_SENDING",
  SET_MESSAGE: "SET_MESSAGE",
};

export const initialResume = {
  personal: { name: "", email: "", phone: "", location: "", summary: "" },
  education: [],
  experience: [],
  skills: [],
  projects: [],
};

export function resumeReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_SECTION: {
      const { key, value } = action.payload;
      return {
        ...state,
        resume: { ...state.resume, [key]: value },
      };
    }

    case ACTIONS.SET_RESUME: {
      return { ...state, resume: action.payload };
    }

    case ACTIONS.RESET:
      return {
        ...state,
        resume: initialResume,
        ui: { touched: false, sending: false, message: null },
      };

    case ACTIONS.AUTOFILL:
      return {
        ...state,
        resume: {
          personal: {
            name: "Rudra Ali Gonsalves",
            email: "name.surname@example.com",
            phone: "+91 12345 67890",
            location: "Ahmedabad, Gujarat, India",
            summary:
              "Software engineer with 3+ years building web applications using React and Node.js. Focused on performance, maintainable code, and delivering user-centric features.",
          },
          education: [
            {
              institution: "Dhirubhai Ambani University",
              degree: "B.Tech - Information and Communication Technology",
              year: "2023",
            },
          ],
          experience: [
            {
              company: "Tech Solutions Pvt. Ltd.",
              role: "Software Engineer",
              duration: "Jul 2021 - Present",
              highlights: [
                "Built and maintained customer-facing web apps using React and Node.js.",
                "Improved page load time by 40% and reduced error rate with robust monitoring.",
              ],
            },
          ],
          skills: [
            "JavaScript",
            "React",
            "Node.js",
            "TypeScript",
            "PostgreSQL",
            "Docker",
            "Git",
          ],
          projects: [
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
          ],
        },
      };

    case ACTIONS.SET_TOUCHED:
      return { ...state, ui: { ...state.ui, touched: !!action.payload } };

    case ACTIONS.SET_SENDING:
      return { ...state, ui: { ...state.ui, sending: !!action.payload } };

    case ACTIONS.SET_MESSAGE:
      return { ...state, ui: { ...state.ui, message: action.payload } };

    default:
      return state;
  }
}