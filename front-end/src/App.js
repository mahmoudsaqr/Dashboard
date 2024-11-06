import { Route, Routes } from "react-router-dom";
//Website
import Login from "./Pages/Website/Auth/Login";
import Home from "./Pages/Website/Home";
import AboutUs from "./Pages/Website/AboutUs";
import SignUp from "./Pages/Website/Auth/SignUp";
//Dashboard - Users
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Dashboard/Users/Users";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import CreateUser from "./Pages/Dashboard/Users/CreateUser";
import RequireAuth from "./Pages/Website/Auth/RequireAuth";
import PersistLogin from "./Pages/Website/Auth/PersistLogin";
import Products from "./Pages/Dashboard/Products/Products";
import NewProducts from "./Pages/Dashboard/Products/NewProducts";
import UpdateProducts from "./Pages/Dashboard/Products/UpdateProducts";

export default function App() {
  return (
    <div>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/About" element={<AboutUs />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<Users />} />
              <Route path="users/:id" element={<UpdateUser />} />
              <Route path="user/create" element={<CreateUser />} />
              <Route path="products" element={<Products />} />
              <Route path="products/create" element={<NewProducts />} />
              <Route path="products/:id" element={<UpdateProducts />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
