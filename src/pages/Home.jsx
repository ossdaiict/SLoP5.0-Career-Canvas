import { Link } from "react-router-dom";
import { useTheme } from "../state/ThemeContext";
import { Eye, ListChecks, FileDown } from "lucide-react";
import "../components/styles/home.css";

export default function Home() {
    const { theme } = useTheme();
    return (
        <div className={`home-root ${theme === "dark" ? "home-dark" : ""}`}>
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 hero-gradient" />
                <div className="relative max-w-6xl mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight home-title">Craft standout resumes in minutes</h1>
                            <p className="mt-4 text-lg home-sub">CareerCanvas helps you build a polished, professional resume with live preview and clean design presets.</p>
                            <div className="mt-6 flex gap-4">
                                <Link to="/builder" className="px-5 py-3 rounded-lg home-cta-primary">Open Resume Builder</Link>
                                <Link to="/" className="px-5 py-3 rounded-lg home-cta-secondary">Explore Landing</Link>
                            </div>
                        </div>
                        <div className="rounded-xl feature-card p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className="icon-wrap indigo"><Eye size={22} /></div>
                                <div>
                                    <p className="feature-title">Live Preview</p>
                                    <p className="feature-sub">See changes instantly as you type.</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-4">
                                <div className="icon-wrap rose"><ListChecks size={22} /></div>
                                <div>
                                    <p className="feature-title">Clean Sections</p>
                                    <p className="feature-sub">Focus on what matters with guided steps.</p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-4">
                                <div className="icon-wrap emerald"><FileDown size={22} /></div>
                                <div>
                                    <p className="feature-title">Export PDF</p>
                                    <p className="feature-sub">Download a crisp PDF ready to share.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 pb-20">
                <h2 className="text-2xl font-bold home-title">Why CareerCanvas?</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-xl info-card p-6">
                        <p className="info-title">Simple and fast</p>
                        <p className="info-sub mt-1">No clutter. Just the essentials to ship your resume quickly.</p>
                    </div>
                    <div className="rounded-xl info-card p-6">
                        <p className="info-title">Modern design</p>
                        <p className="info-sub mt-1">Clean typography and spacing for maximum readability.</p>
                    </div>
                    <div className="rounded-xl info-card p-6">
                        <p className="info-title">Flexible themes</p>
                        <p className="info-sub mt-1">Toggle light/dark while building. Your landing stays gorgeous.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
