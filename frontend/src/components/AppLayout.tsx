import { Outlet } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="grid-rows-[auto_1fr_auto ] grid h-screen w-full">
      <Header />
      <Main className="overflow-scroll">
        <Outlet />
      </Main>
      <Footer />
    </div>
  );
}

export default AppLayout;
