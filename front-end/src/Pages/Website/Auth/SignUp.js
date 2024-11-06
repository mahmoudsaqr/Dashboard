import React, { useContext, useEffect, useState } from "react";

import Header from "../../../Components/Header";
// import Form from "../../../Components/Forms/Form";
import axios from "axios";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [passwordR, setPassR] = useState("");
  const [accept, SetAccept] = useState(false);
  //   const [flag, SetFlag] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const cookie = new Cookies();
  const nav = useNavigate()
  const UserNow = useContext(User);
  console.log(UserNow);
  // useEffect(() => {
  //   setName(props.name);
  //   setEmail(props.email);
  // }, [props.name, props.email]);

  const form = {
    boxShadow: "0px 0px 48px 8px rgba(0, 0, 0, 0.3)",
    width: "400px",
  };
  const btnStyle = {
    width: "100%",
  };

  async function Submit(e) {
    let flag = false;
    e.preventDefault();
    SetAccept(true);
    if (name === "" || password.length < 6 || passwordR !== password) {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        //send Data
        console.log("Good");
        let res = await axios.post("http://127.0.0.1:8000/api/register", {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordR,
        });
        console.log(res);
        const token = res.data.data.token;
        cookie.set("Bearer", token);
        const userDetails = res.data.data.user;
        UserNow.setAuth({ token, userDetails });
        nav("/dashboard")
      }
    } catch (err) {
      if (err.response.status === 422) {
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
        {/* <Form
          myBTN="Register"
          endPoint="register"
          navigator=""
          emailLocalst={true}
          hasBXshadow={true}
        /> */}
        <form onSubmit={Submit} style={form}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name..."
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          {name === "" && accept && (
            <p style={{ color: "red" }}>Name required</p>
          )}
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
          <label htmlFor="re">Repeat Password</label>
          <input
            type="password"
            placeholder="Repeat Password..."
            id="re"
            value={passwordR}
            onChange={(e) => setPassR(e.target.value)}
          ></input>
          {passwordR !== password && accept && (
            <p style={{ color: "red" }}>Password doesn't match</p>
          )}
          <div className="register" style={btnStyle}>
            <button type="submit" style={btnStyle}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
