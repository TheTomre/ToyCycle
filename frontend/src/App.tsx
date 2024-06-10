import { Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import About from "./features/about/About";
import Catalog from "./features/toy/Toys";
import ToyDetails from "./features/toy/ToyDetails";
// import Users from "./features/user/Users";
import UserProfilePage from "./features/user/UserProfilePage";
import ContactUs from "./features/about/ContactUs";
import AppLayout from "./components/AppLayout";
import AuthUserCallbackPage from "./features/auth/AuthUserCallbackPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/toys" element={<Catalog />} />
        <Route path="/toys/:id" element={<ToyDetails />} />
        <Route path="/auth-user" element={<AuthUserCallbackPage />} />
        <Route path="/users" element={<UserProfilePage />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
