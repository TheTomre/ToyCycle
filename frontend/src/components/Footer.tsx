import { FaGithubAlt } from "react-icons/fa";
import { NAV_ITEMS } from "../lib/consts";

function Footer() {
  const hoverEffect = "hover:scale-110 transition-transform duration-300";

  return (
    <footer className="w-full py-6 px-4 self-end bg-[#70e2d2] font-sans">
      <div className="flex-col w-full justify-between items-start">
        <div>
          <h2 className="text-[#3a0e7b] text-2xl font-bold font-mono">
            Toy Cycle
          </h2>
        </div>
        <ul className="py-6 flex justify-between text-[#3a0e7b] flex-wrap gap-2 ml-auto">
          {NAV_ITEMS.map(navEl => (
            <li key={navEl} className="cursor-pointer uppercase font-mono">
              {navEl}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-9 sm:gap-12 justify-center pb-6">
        <a
          className={hoverEffect}
          aria-label="GitHub Repository Link"
          href="https://github.com/TheTomre/ToyCycle"
          id="github-link"
        >
          <FaGithubAlt color="#3a0e7b" size={30} />
        </a>
        <a
          className={hoverEffect}
          aria-label="Elevation home page link"
          href="https://elevation.ac/"
          id="elevation-link"
        >
          <span className="block w-7 h-7 bg-cover bg-norepeat bg-[url('./assets/icons/elevation.svg')] " />
        </a>
        <a
          className={hoverEffect}
          aria-label="Itworks home page link"
          href="https://www.itworks.org.il/"
          id="itworks-link"
        >
          <span className="block w-12 h-7 bg-cover bg-norepeat bg-[url('./assets/icons/itworks.svg')] " />
        </a>
      </div>
      <div className="sm:flex-row gap-4 items-center justify-between flex flex-col-reverse">
        <div className="flex items-center">
          <p className="text-[#3a0e7b]">
            {new Date().getFullYear()} &copy; ToyCycle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
