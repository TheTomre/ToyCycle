import { Route, Routes } from "react-router-dom";
import Home from "./features/home/Home";
import About from "./features/about/About";
import ToysPage from "./features/toy/ToysPage";
import UserProfilePage from "./features/user/UserProfilePage";
import AppLayout from "./components/AppLayout";
import AuthUserCallbackPage from "./features/auth/AuthUserCallbackPage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import ToyDetails from "./features/toy/ToyDetails";
import Error from "./components/Error";
import ToyCreatePage from "./features/toy/ToyCreatePage";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<AppLayout />}>
        <Route path="/about" element={<About />} />
        <Route path="/toys" element={<ToysPage />} />
        <Route path="/toys/:id" element={<ToyDetails />} />
        <Route path="/auth-user" element={<AuthUserCallbackPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/toys/create" element={<ToyCreatePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Error errorMessage="Page not Found" />} />
    </Routes>
  );
}

export default App;
