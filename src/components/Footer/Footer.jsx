import { FaTwitter, FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="cc-footer" role="contentinfo">
      
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="cc-footer-blob cc-blob-blue" />
        <div className="cc-footer-blob cc-blob-red" />
        <div className="cc-footer-blob cc-blob-deep" />
        <div className="cc-footer-topline" />
      </div>

      <div className="cc-container">
        <div className="cc-row">
          <div className="flex-shrink-0">
            <div className="cc-title">CareerCanvas</div>
          </div>

          <div className="cc-center">
            <div className="font-medium">© 2025 CareerCanvas</div>
            <div className="muted">Developed by OSSD@DAIICT</div>
            <div className="muted">Version 1.0.0</div>
          </div>

          <div className="cc-social" role="navigation">
            <IconLink href="https://x.com/gdgdaiict" label="Twitter" extraClass="">
              <FaTwitter />
            </IconLink>
            <IconLink href="https://www.instagram.com/gdg.daiict/" label="Instagram" extraClass="">
              <FaInstagram />
            </IconLink>
            <IconLink href="https://github.com/ossdaiict/SLoP5.0-Career-Canvas" label="GitHub" extraClass="">
              <FaGithub />
            </IconLink>
            <IconLink href="https://www.linkedin.com/company/gdg-on-campus-daiict/" label="LinkedIn" extraClass="">
              <FaLinkedin />
            </IconLink>
            <IconLink href="mailto:dsc@dau.ac.in" label="Email" extraClass="">
              <MdEmail />
            </IconLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function IconLink({ href, label, children, extraClass = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`cc-iconlink ${extraClass}`}
    >
      <span className="cc-icon">{children}</span>
    </a>
  );
}
