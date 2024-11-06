import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Header() {
  const cookie = new Cookies();
  const tokenCookie = cookie.get("Bearer");
   const navigate = useNavigate();
  async function handleLogOut() {
    await axios.post("http://127.0.0.1:8000/api/logout", null, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + tokenCookie,
      },
    });
    cookie.remove("Bearer");
    navigate("/");
  }
  return (
    <div style={{ boxShadow: "1px 1px 10px 1px #bababa" }}>
      <nav
        className="container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div style={{ display: "flex" }} className="links">
          <Link className="registen-nav" to="/">
            Home
          </Link>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {tokenCookie ? (
            <>
              <Link to="/dashboard" className="registen-nav">
                Dashboard
              </Link>
              <Link to="/" className="registen-nav" onClick={handleLogOut}>
                Log Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="registen-nav">
                Register
              </Link>
              <Link to="/login" className="registen-nav">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
