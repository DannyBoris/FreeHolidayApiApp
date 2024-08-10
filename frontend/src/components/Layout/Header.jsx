import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
function Header() {
  const { user, setUser } = useContext(UserContext);
  function navigateToSection() {
    const sectionId = window.location.hash;
    if (sectionId) {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  const location = useLocation();

  useEffect(() => {
    navigateToSection();
  }, [location.hash]);

  const links = [
    { name: "API docs", href: "/docs" },
    { name: "Countries", href: "countries" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Support", href: "/#support" },
  ];

  return (
    <header className="h-[80px] border-b border-b-gray-200 items-center py-2 justify-between flex bg-white">
      <div className="container mx-auto">
        <div className="flex items-center h-full justify-between w-full">
          <Link to="/">
            <div className="h-full p-5 text-2xl bg-gradient-1 bg-clip-text text-transparent underline">
              FreeHolidayAPI
            </div>
          </Link>
          <nav>
            <ul className="flex items-center gap-10">
              {links.map((link) => (
                <li key={link.name} className="inline-block mx-2">
                  <Link
                    to={link.href}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {user ? (
            <Link to="/dashboard" className="btn-primary btn-lg">
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-6">
              <a href="/login">Login</a>
              <a href="/login?signup=true" className="btn-primary">
                Sign up
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
