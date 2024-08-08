import { useEffect } from "react";
import { Link } from "react-router-dom";
function Header() {
  function navigateToSection() {
    const sectionId = window.location.hash;
    if (sectionId) {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  useEffect(() => {
    navigateToSection();
  }, []);

  return (
    <header className="w-full border-stroke bg-white duration-300 dark:border-stroke-dark dark:bg-black border-b border-b-gray-200">
      <div className="container">
        <div className="flex items-center justify-between  h-[60px]">
          <div className="block py-4 lg:py-0">
            <a href="/" className="block max-w-[145px] sm:max-w-[180px]">
              <img
                src="images/logo.svg"
                alt="logo"
                className="block dark:hidden"
              />
              <img
                src="images/logo-white.svg"
                alt="logo"
                className="hidden dark:block"
              />
            </a>
          </div>
          <button
            className="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden"
            aria-label="navbarOpen"
            name="navbarOpen"
          >
            <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
            <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
            <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
          </button>
          <div className="menu-wrapper relative hidden justify-between lg:flex">
            <button
              className="navbarClose fixed top-10 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden"
              name="navbarClose"
              aria-label="navbarClose"
            >
              <span className="block h-[2px] w-7 rotate-45 bg-black dark:bg-white"></span>
              <span className="-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black dark:bg-white"></span>
            </button>
            <nav className="fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-white bg-opacity-95 text-center backdrop-blur-sm dark:bg-black dark:bg-opacity-95 lg:static lg:h-auto lg:w-max lg:bg-transparent lg:backdrop-blur-none lg:dark:bg-transparent">
              <ul className="items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10">
                <li className="menu-item">
                  <a
                    href="#about"
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                  >
                    API docs
                  </a>
                </li>
                <li className="menu-item">
                  <Link
                    to="countries"
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                  >
                    Countries
                  </Link>
                </li>
                <li className="menu-item">
                  <a
                    href="/#pricing"
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                  >
                    Pricing
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    href="/#support"
                    className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mr-[60px] flex items-center justify-end lg:mr-0">
            <label
              htmlFor="themeSwitcher"
              className="inline-flex cursor-pointer items-center"
              aria-label="themeSwitcher"
              name="themeSwitcher"
            >
              <input
                type="checkbox"
                name="themeSwitcher"
                id="themeSwitcher"
                className="sr-only"
              />
              <span className="hidden dark:block">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_420_119)">
                    <path
                      d="M8.40276 5.88205C8.40259 7.05058 8.75048 8.19267 9.40204 9.16268C10.0536 10.1327 10.9793 10.8866 12.0611 11.3284C13.143 11.7701 14.3318 11.8796 15.4761 11.6429C16.6204 11.4062 17.6683 10.8341 18.4861 9.99941V10.0834C18.4861 14.7243 14.7242 18.4862 10.0833 18.4862C5.44247 18.4862 1.68054 14.7243 1.68054 10.0834C1.68054 5.44259 5.44247 1.68066 10.0833 1.68066H10.1673C9.60775 2.22779 9.16333 2.88139 8.86028 3.60295C8.55722 4.32451 8.40166 5.09943 8.40276 5.88205V5.88205ZM3.3611 10.0834C3.36049 11.5833 3.86151 13.0403 4.78444 14.2226C5.70737 15.4049 6.99919 16.2446 8.45437 16.608C9.90954 16.9715 11.4445 16.8379 12.8149 16.2284C14.1854 15.6189 15.3127 14.5686 16.0174 13.2446C14.7632 13.54 13.4543 13.5102 12.215 13.1578C10.9756 12.8054 9.84679 12.1422 8.93568 11.2311C8.02457 10.32 7.36136 9.19119 7.00898 7.95181C6.6566 6.71243 6.62672 5.40357 6.92219 4.1494C5.84629 4.72259 4.94652 5.57759 4.31923 6.62288C3.69194 7.66817 3.36074 8.86438 3.3611 10.0834V10.0834Z"
                      fill="white"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_420_119">
                      <rect
                        width="20.1667"
                        height="20.1667"
                        fill="white"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </span>
            </label>
            <div className="flex items-center gap-3">
              <Link
                to="dashboard"
                className="hidden py-[10px] rounded bg-purple-400 font-sm text-white px-6 text-base   dark:text-white dark:hover:text-primary sm:inline-block"
              >
                Go to dashboard
              </Link>
              <Link
                to="login?signup=true"
                className="hidden rounded-md bg-primary py-[10px] px-[30px] text-base font-medium text-white hover:bg-opacity-90 sm:inline-block"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
