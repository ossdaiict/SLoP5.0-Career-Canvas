import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="text-white p-4 relative z-30" style={{ backgroundColor: "#0e0e0eff" }}>
        {!isMobile && (
            <nav className="flex items-center text-lg">
                <Link to="/" className="font-bold text-2xl hover:text-gray-200">
                    CareerCanvas
                </Link>
                
                <div className="flex-1" />
                
                <div className="flex items-center gap-8">
                    <Link to="/home" className="hover:text-gray-200">
                        Home
                    </Link>
                    <Link to="/builder" className="hover:text-gray-200">
                        Resume Builder
                    </Link>
                </div>
            </nav>
        )}

        {isMobile && (
        <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold hover:text-gray-200">
            CareerCanvas
            </Link>

            <button
                onClick={() => setOpen((v) => !v)}
                className="text-2xl"
                >
                {open ? "✕" : "☰"}
            </button>

            {open && (
            <div className="absolute left-0 right-0 top-full px-4 py-3 shadow-lg" style={{ backgroundColor: "#0e0e0eff" }}>
                <nav className="flex flex-col gap-2">
                    <Link
                        to="/home"
                        onClick={() => setOpen(false)}
                        className="block py-2 px-1"
                    >
                        Home
                    </Link>
                    <Link
                        to="/builder"
                        onClick={() => setOpen(false)}
                        className="block py-2 px-1"
                    >
                    Resume Builder
                    </Link>
                </nav>
            </div>
            )}
        </div>
        )}

    </header>
  );
}