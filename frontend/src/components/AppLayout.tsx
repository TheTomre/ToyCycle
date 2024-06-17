import { Outlet } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useAppSelector } from "../hooks/redux";

function AppLayout() {
  const { isNavOpen } = useAppSelector(state => state.ui);
  return (
    <div
      className={`${isNavOpen ? "overflow-y-hidden" : ""} flex flex-col min-h-full w-full`}
    >
      <Header />
      <Main className="mt-[118px] sm:mt-[118px] flex-1 bg-purple-50">
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}

export default AppLayout;
