import { FaCaretDown } from "react-icons/fa6";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import fly from "../../assets/icons/fly.svg";
import stars from "../../assets/icons/stars.svg";
import cloud from "../../assets/icons/cloud.svg";
import horse from "../../assets/icons/horse.svg";
import legocloud from "../../assets/icons/lego.svg";
import babytoy from "../../assets/icons/babytoy.svg";
import traincloud from "../../assets/icons/train.svg";
import lego2 from "../../assets/icons/lego2.svg";
import CategoriesList from "../../components/CategoriesList";
import { CATEGORIES_AGE } from "../../lib/consts";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Home() {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect();
  };

  const parallax = useRef<IParallax>(null!);
  return (
    <div className="relative">
      <div className="w-[100vw] h-[100vh] bg-indigo-50">
        <Parallax ref={parallax} pages={4}>
          <div className="bg-white w-full flex justify-center p-2 h-[118px]">
            <Header />
          </div>
          <ParallaxLayer
            offset={1.3}
            speed={0.3}
            style={{ backgroundColor: "#3a0e7b" }}
          />
          <ParallaxLayer
            offset={1.1}
            speed={1}
            style={{
              backgroundImage: `url(${stars})`,
              backgroundSize: "cover"
            }}
          />

          <ParallaxLayer
            offset={1.3}
            speed={0.1}
            style={{ pointerEvents: "none", opacity: 0.2 }}
          >
            <img
              src={fly}
              alt="UI element"
              style={{
                width: "20%",
                marginLeft: "65%",
                transform: "scaleX(-1)"
              }}
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={0.2}
            speed={-0.3}
            style={{ pointerEvents: "none", opacity: 0.2 }}
          >
            <img
              src={fly}
              alt="UI element"
              style={{ width: "20%", marginLeft: "14%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={0.3} speed={0.8} style={{ opacity: 0.1 }}>
            <img
              src={horse}
              alt="UI element"
              style={{
                display: "block",
                width: "20%",
                marginLeft: "75%",
                marginTop: "15%"
              }}
            />
            <img
              src={cloud}
              alt="UI element"
              style={{ display: "block", width: "10%", marginLeft: "15%" }}
            />
          </ParallaxLayer>
          <ParallaxLayer offset={1.3} speed={0.4} style={{ opacity: 0.15 }}>
            <img
              src={horse}
              alt="UI element"
              style={{
                display: "block",
                width: "25%",
                marginLeft: "15%",
                marginTop: "15%"
              }}
            />
            <img
              src={cloud}
              alt="UI element"
              style={{ display: "block", width: "10%", marginLeft: "15%" }}
            />
          </ParallaxLayer>
          <ParallaxLayer offset={1.2} speed={1} style={{ opacity: 0.1 }}>
            <img
              src={babytoy}
              alt="UI element"
              style={{ display: "block", width: "5%", marginLeft: "15%" }}
            />
          </ParallaxLayer>
          <ParallaxLayer offset={1} speed={0.5} style={{ opacity: 0.1 }}>
            <img
              src={babytoy}
              alt="UI element"
              style={{ display: "block", width: "25%", marginLeft: "70%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
            <img
              src={legocloud}
              alt="UI element"
              style={{ display: "block", width: "10%", marginLeft: "10%" }}
            />
          </ParallaxLayer>
          <ParallaxLayer offset={2} speed={0.5} style={{ opacity: 0.2 }}>
            <img
              src={legocloud}
              alt="UI element"
              style={{ display: "block", width: "15%", marginLeft: "76%" }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.2 }}>
            <img
              src={traincloud}
              alt="UI element"
              style={{
                display: "block",
                width: "20%",
                marginLeft: "40%",
                marginTop: "15%"
              }}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
            <img
              src={lego2}
              alt="UI element"
              style={{ display: "block", width: "20%", marginLeft: "5%" }}
            />
          </ParallaxLayer>
          <ParallaxLayer offset={2.7} speed={0.6} style={{ opacity: 0.1 }}>
            <img
              src={horse}
              alt="UI element"
              style={{
                display: "block",
                width: "15%",
                marginLeft: "45%",
                marginTop: "15%"
              }}
            />
            <img
              src={babytoy}
              alt="UI element"
              style={{ display: "block", width: "15%", marginLeft: "70%" }}
            />
          </ParallaxLayer>

          {/* Welcome to ToyCycle */}
          <ParallaxLayer
            offset={0.15}
            speed={0.1}
            className="mt-12 sm:mt-24 items-center justify-center flex-col"
          >
            <section id="hero" className="text-center py-7">
              <div className="container mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#3a0e7b] font-mono font-bold mb-4 tracking-tight">
                  Welcome to ToyCycle
                </h2>
                <p className="text-xl sm:text-2xl md:text-3xl mb-4 font-sans text-[#280b5f]">
                  Exchange toys, earn tokens, and foster a sustainable toy
                  community.
                </p>
                <Link
                  to="/toys"
                  className="text-xl font-semibold sm:text-2xl font-mono tracking-tight inline-block bg-[#70e2d2] text-[#3a0e7b] mt-2 sm:mt-4 px-6 py-3 sm:px-8 sm:py-4 rounded hover:bg-[#56ffe8] transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </section>
            <section id="about" className="pt-6 pb-6 sm:pb-10 ">
              <div className="container mx-auto text-center">
                <h2 className="text-xl sm:text-3xl md:text-4xl text-[#3a0e7b] font-mono font-bold mb-4 tracking-tight">
                  About ToyCycle
                </h2>
                <p className="max-w-[100%] sm:max-w-[80%] mx-auto text-l sm:text-xl md:text-2xl mb-4 font-sans text-[#280b5f]">
                  ToyCycle is a dynamic platform aimed at fostering a
                  community-based toy exchange. Our goal is to enable families
                  to exchange toys or use tokens as a flexible, gamified
                  currency within the platform.
                </p>
              </div>
            </section>
            <section className="pb-96">
              <CategoriesList
                className="m-auto w-[70%] grid-cols-2 grid md:grid-cols-4 gap-4 "
                categories={CATEGORIES_AGE}
              />
            </section>
          </ParallaxLayer>

          {/* Features 1.3 */}
          <ParallaxLayer
            offset={1.3}
            speed={0.1}
            className="flex justify-center items-center"
          >
            <section id="features" className="my-4 py-16">
              <div className="container mx-auto ">
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-indigo-100 font-mono font-bold mb-4 sm:mb-12 tracking-tight text-center">
                  Features
                </h2>
                <ul className="max-w-5xl text-l sm:text-2xl md:text-3xl mb-4 font-sans text-indigo-100 space-y-6">
                  <li className="flex items-center gap-2">
                    <FaCaretDown />
                    User Management: Full CRUD operations for user accounts,
                    including registration, profile updates, and soft deletion.
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCaretDown />
                    Toy Management: Post, update, or remove toy listings with
                    detailed descriptions, images, and category tags.
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCaretDown />
                    Token System: Earn tokens by listing toys and spend tokens
                    to claim toys from others, with a transparent transaction
                    history.
                  </li>
                </ul>
              </div>
            </section>
          </ParallaxLayer>

          {/* How It Works */}
          <ParallaxLayer
            offset={2.4}
            speed={0.1}
            className="flex items-center justify-center flex-col mt-32 sm:mt-2"
          >
            <section id="how-it-works" className="pb-16 pt-32">
              <div className="container mx-auto text-center">
                <h2 className="text-xl sm:text-3xl md:text-4xl text-[#3a0e7b] font-mono font-bold mb-4 tracking-tight">
                  How It Works
                </h2>
                <ul className="max-w-5xl text-l sm:text-2xl md:text-3xl mb-4 font-sans text-[#280b5f] space-y-6  ">
                  <li className=" ">
                    Register for a free account and create your profile.
                  </li>
                  <li className="">
                    List toys you want to exchange or browse available toys.
                  </li>
                  <li className="">
                    Use tokens to claim toys from others or convert your toys
                    into tokens if an exchange is not immediately available.
                  </li>
                  <li className="">
                    Manage your toy listings and token balance easily through
                    your dashboard.
                  </li>
                </ul>
              </div>
            </section>
            <section id="contact" className=" py-8">
              <div className="container mx-auto text-center">
                <h2 className="text-xl sm:text-3xl md:text-4xl text-[#3a0e7b] font-mono font-bold mb-4 tracking-tight">
                  Contact Us
                </h2>
                <p className="max-w-5xl text-l sm:text-2xl md:text-3xl mb-4 font-sans text-[#280b5f] space-y-6 ">
                  If you have any questions or need support, please contact us
                  at{" "}
                  <a
                    href="mailto:support@toycycle.com"
                    className="text-[#3a0e7b] fonr-semibold hover:underline"
                  >
                    support@toycycle.com
                  </a>
                  .
                </p>
              </div>
            </section>
            <section id="signup" className="py-8 mb-16">
              <div className="container mx-auto text-center">
                <h2 className="text-xl sm:text-3xl md:text-4xl text-[#3a0e7b] font-mono font-bold mb-4 tracking-tight">
                  Sign Up
                </h2>
                <p className="max-w-5xl text-l sm:text-2xl md:text-3xl mb-4 font-sans text-[#280b5f] space-y-6 ">
                  Join ToyCycle today and start exchanging toys with our
                  community!
                </p>
                <button
                  onClick={() => handleLogin()}
                  className="text-xl font-semibold sm:text-2xl font-mono tracking-tight inline-block bg-[#70e2d2] text-[#3a0e7b] mt-2 sm:mt-4 px-6 py-3 sm:px-8 sm:py-4 rounded hover:bg-[#56ffe8] transition-all duration-300"
                >
                  Sign Up Now
                </button>
              </div>
            </section>
          </ParallaxLayer>
          <Footer className="absolute bottom-0" />
        </Parallax>
      </div>
    </div>
  );
}

export default Home;
