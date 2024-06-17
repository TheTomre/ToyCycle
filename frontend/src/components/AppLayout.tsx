import { Outlet } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useAppSelector } from "../hooks/redux";

function AppLayout() {
  const { isNavOpen } = useAppSelector(state => state.ui);
  return (
    <div
      className={`${isNavOpen ? "overflow-y-hidden" : ""} flex-col min-h-full w-full`}
    >
      <Header />
      <Main className="overflow-scroll mt-[78px] sm:mt-[96px] light-background">
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}

export default AppLayout;
