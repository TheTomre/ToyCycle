import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import About from "./features/about/About";
import Catalog from "./features/toy/Toys";
import ToyDetails from "./features/toy/ToyDetails";
import Users from "./features/user/Users";
import UserProfile from "./features/user/UserProfile";
import ContactUs from "./features/about/ContactUs";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/toys" element={<Catalog />} />
          <Route path="/toys/:id" element={<ToyDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
