import { Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import About from "./features/about/About";
import ToysPage from "./features/toy/ToysPage";
import ToyCreatePage from "./features/toy/ToyCreatePage";
// import Users from "./features/user/Users";
import UserProfilePage from "./features/user/UserProfilePage";
import ContactUs from "./features/about/ContactUs";
import AppLayout from "./components/AppLayout";
import AuthUserCallbackPage from "./features/auth/AuthUserCallbackPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import ToyDetails from "./features/toy/ToyDetails";
import ToyEditPage from "./features/toy/ToyEditPage";
import BlogPage from "./features/blog/BlogPage";
import BlogDetails from "./features/blog/BlogDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/toys" element={<ToysPage />} />
        <Route path="/toys/:id" element={<ToyDetails />} />
        <Route path="/toys/create" element={<ToyCreatePage />} />
        <Route path="/toys/edit/:id" element={<ToyEditPage />} />
        <Route path="/auth-user" element={<AuthUserCallbackPage />} />
        <Route path="/users" element={<UserProfilePage />} />
        <Route path="/users/:id" element={<UserProfilePage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
      </Route>
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}

export default App;
