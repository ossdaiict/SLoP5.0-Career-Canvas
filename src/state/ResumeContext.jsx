import React, { createContext, useContext, useReducer, useMemo } from "react";
import { resumeReducer, ACTIONS, initialResume } from "./ResumeReducer";
import { validateResume, hasErrors as checkErrors } from "../utils/validators";

const initialState = {
  resume: initialResume,
  ui: { touched: false, sending: false, message: null },
};

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  const validation = useMemo(() => validateResume(state.resume), [state.resume]);
  const hasErrors = useMemo(() => checkErrors(validation), [validation]);

  const actions = useMemo(() => ({
    setSection: (key, value) => dispatch({ type: ACTIONS.SET_SECTION, payload: { key, value } }),
    setResume: (r) => dispatch({ type: ACTIONS.SET_RESUME, payload: r }),
    reset: () => dispatch({ type: ACTIONS.RESET }),
    autofill: () => dispatch({ type: ACTIONS.AUTOFILL }),
    setTouched: (v) => dispatch({ type: ACTIONS.SET_TOUCHED, payload: v }),
    setSending: (v) => dispatch({ type: ACTIONS.SET_SENDING, payload: v }),
    setMessage: (msg) => dispatch({ type: ACTIONS.SET_MESSAGE, payload: msg }),
  }), []);

  return (
    <ResumeContext.Provider value={{ state, actions, validation, hasErrors }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return ctx;
}