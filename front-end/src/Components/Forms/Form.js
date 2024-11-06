import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import { useContext } from "react";
import { User } from "../../Pages/Website/Context/UserContext";

export default function Form(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [passwordR, setPassR] = useState("");
  const [accept, SetAccept] = useState(false);
  //   const [flag, SetFlag] = useState(false);
  const [emailError, setEmailError] = useState("");

  const UserNow = useContext(User);
  console.log(UserNow);
  useEffect(() => {
    setName(props.name);
    setEmail(props.email);
  }, [props.name, props.email]);

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
        let res = await axios.post(
          `http://127.0.0.1:8000/api/${props.endPoint}`,
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordR,
          }
        );
        console.log(res);
        const token = res.data.data.token;
        const userDetails = res.data.data.user;
        UserNow.setAuth({ token, userDetails });
        if (res.status === 200) {
          {
            props.emailLocalst && window.localStorage.setItem("Email", email);
          }
          // window.location.pathname = `/${props.navigator}`;
        }
      }
    } catch (err) {
      setEmailError(err.response.status);
    }
  }
  return (
    <div>
      <form onSubmit={Submit} style={props.hasBXshadow && form}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Name..."
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        {name === "" && accept && <p style={{ color: "red" }}>Name required</p>}
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
        <div className="register" style={props.hasBTNsytle && btnStyle}>
          <button type="submit" style={props.hasBTNsytle && btnStyle}>
            {props.myBTN}
          </button>
        </div>
      </form>
    </div>
  );
}
