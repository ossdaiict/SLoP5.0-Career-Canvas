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
    <header className="bg-blue-600 text-white p-4 relative z-30">
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
            <div className="absolute left-0 right-0 top-full bg-blue-600 px-4 py-3 shadow-lg">
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