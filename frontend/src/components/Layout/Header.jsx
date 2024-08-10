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
    { name: "API docs", href: "#about" },
    { name: "Countries", href: "countries" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Support", href: "/#support" },
    { name: "Blog", href: "/#blog" },
  ];

  return (
    <header className="h-[80px] border-b border-b-gray-200 items-center py-2 justify-between flex bg-white">
      <div className="container mx-auto">
        <div className="flex items-center h-full justify-between w-full">
          <div className="h-full bg-blue-500 p-5">LOGO</div>
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
            <button className="btn-primary btn-lg">Dashboard</button>
          ) : (
            <div className="flex items-center gap-6">
              <button>Login</button>
              <button className="btn-primary">Sign up</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
