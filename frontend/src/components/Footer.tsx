import { FaGithubAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./UI/button";

type Props = {
  className?: string;
};

function Footer({ className }: Props) {
  const navigate = useNavigate();
  const hoverEffect = "hover:scale-110 transition-transform duration-300";

  return (
    <footer
      className={`w-full px-7 py-4 sm:px-10 sm:py-6 self-end bg-[#70e2d2] font-sans ${className}`}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-5 sm:flex-row w-full sm:justify-between sm:gap-10">
          <Button
            variant="destructive"
            onClick={() => navigate("/")}
            className="mt-6 flex-[1_1_1] w-16 h-16 p-3 bg-cover bg-norepeat bg-[url('./assets/icons/logo.svg')] hover:rotate-90 transition-all duration-300"
          />

          <div className="flex w-full justify-between md:gap-10 gap-5 flex-[9_1_1]">
            <ul className="py-6 flex justify-evenly text-[#3a0e7b] flex-wrap sm:gap-5 md:gap-10 gap-2 w-full">
              <li className="cursor-pointer uppercase font-mono ">
                <Link className=" font-semibold" to="/home">
                  Home
                </Link>
                <div className="hidden md:flex flex-col text-sm md:text-base">
                  <div>To Our Community</div>
                  <div>Blog</div>
                  <div>FAQs</div>
                  <div>Contact Us</div>
                </div>
              </li>
              <li className="cursor-pointer uppercase font-mono ">
                <Link className="block font-semibold" to="/toys">
                  Browse toys
                </Link>

                <div className="hidden md:flex  flex-col">
                  <div>
                    <Link className="inline-block" to="/toys">
                      All toys
                    </Link>
                  </div>
                  <div>Toys for Young Toddlers</div>
                  <div>Toys for Older Toddlers</div>
                </div>
              </li>
              <li className="cursor-pointer uppercase font-mono">
                <div>
                  <Link className="block font-semibold" to="/about">
                    About
                  </Link>
                </div>
                <div className="hidden md:flex  flex-col">
                  <div>Our Story</div>
                  <div>Our Team</div>
                  <div>Eco-Friendly</div>
                </div>
              </li>
              <li className="uppercase font-mono">
                <Link className="block font-semibold" to="/#">
                  POLICIES
                </Link>
                <div className="hidden md:flex sm:flex-col">
                  <div>Privacy Policy</div>
                  <div>Terms of Service</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="gap-4 items-center justify-between flex flex-col ">
          <div className="flex items-center gap-9 sm:gap-12 justify-center py-6">
            <a
              className={hoverEffect}
              aria-label="GitHub Repository Link"
              href="https://github.com/TheTomre/ToyCycle"
              id="github-link"
            >
              <FaGithubAlt color="#3a0e7b" size={40} />
            </a>
            <a
              className={hoverEffect}
              aria-label="Elevation home page link"
              href="https://elevation.ac/"
              id="elevation-link"
            >
              <span className="block w-[40px] h-[40px] bg-cover bg-norepeat bg-[url('./assets/icons/elevation.svg')] " />
            </a>
            <a
              className={hoverEffect}
              aria-label="Itworks home page link"
              href="https://www.itworks.org.il/"
              id="itworks-link"
            >
              <span className="block w-[70px] h-[40px] bg-cover bg-norepeat bg-[url('./assets/icons/itworks.svg')] " />
            </a>
          </div>
          <div className="flex items-center">
            <p className="text-[#3a0e7b] text-sm ">
              {new Date().getFullYear()} &copy; ToyCycle. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
