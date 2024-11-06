import React, { useContext, useState } from "react";
import axios from "axios";
import Header from "../../../Components/Header";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { User } from "../Context/UserContext";
import Cookies from "universal-cookie";
export default function Login() {

  
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [accept, SetAccept] = useState(false);
  //   const [flag, SetFlag] = useState(false);
  const nav = useNavigate();
  const UserNow = useContext(User);
  console.log(UserNow);
  const [emailError, setEmailError] = useState("");
  const cookie = new Cookies();



  async function Submit(e) {
    let flag = false;
    e.preventDefault();
    SetAccept(true);
    if (password.length < 6) {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        //send Data
        console.log("Good");
        let res = await axios.post("http://127.0.0.1:8000/api/login", {
          email: email,
          password: password,
        });
        console.log(res);
        const token = res.data.data.token;
        cookie.set("Bearer", token);
        const userDetails = res.data.data.user;
        UserNow.setAuth({ token, userDetails });
        nav("/dashboard");
      }
    } catch (err) {
      if (err.response.status === 401) {
        setEmailError(err.response.status);
      }
      SetAccept(true);
    }
  }
  return (
    <div>
      <div style={{ boxShadow: "1px 1px 10px 1px #bababa" }}>
        <Header />
      </div>
      <div
        className="container father"
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          onSubmit={Submit}
          style={{
            width: "400px",
            boxShadow: "0px 0px 48px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email..."
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          {accept && emailError === 422 && <p>Email has Already Been Taken</p>}
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            placeholder="Password..."
            id="pass"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          ></input>
          {password.length < 6 && accept && (
            <p style={{ color: "red" }}>
              Password should be more than 6 character
            </p>
          )}
          <div className="register">
            <button type="submit">Login</button>
          </div>
          {accept && emailError === 401 && <p style={{textAlign:"center"}}>Password or Email isn't right</p>}
        </form>
      </div>
    </div>
  );
}
