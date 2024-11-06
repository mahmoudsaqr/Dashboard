import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="side-bar">
      <NavLink
        to="/dashboard/users"
        className={({ isActive }) =>
          isActive ? "side-item active" : "side-item"
        }
      >
        <i className="fa-solid fa-users"></i>
        Users
      </NavLink>

      <NavLink
        to="/dashboard/user/create"
        className={({ isActive }) =>
          isActive ? "side-item active" : "side-item"
        }
      >
        <i className="fa-solid fa-user-plus"></i>
        New User
      </NavLink>

      <NavLink
        to="/dashboard/products"
        end
        className={({ isActive }) =>
          isActive ? "side-item active" : "side-item"
        }
      >
        <i className="fa-solid fa-list"></i>
        Products
      </NavLink>

      <NavLink
        to="/dashboard/products/create"
        className={({ isActive }) =>
          isActive ? "side-item active" : "side-item"
        }
      >
        <i className="fa-solid fa-plus"></i>
        New Product
      </NavLink>
    </div>
  );
}
