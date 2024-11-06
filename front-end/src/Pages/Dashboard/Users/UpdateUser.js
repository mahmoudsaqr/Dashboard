import { useContext, useEffect, useState } from "react";
import Form from "../../../Components/Forms/Form";
import { User } from "../../Website/Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [passwordR, setPassR] = useState("");
  const [accept, SetAccept] = useState(false);
  //   const [flag, SetFlag] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const context = useContext(User);
  const token = context.auth.token;
  const nav = useNavigate();
  //   const [flag, SetFlag] = useState(false);
  const id = window.location.pathname.split("/").slice(-1);

  const form = {
    boxShadow: "0px 0px 48px 8px rgba(0, 0, 0, 0.3)",
    width: "400px",
  };
  const btnStyle = {
    width: "100%",
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data["0"]["name"]);
        setEmail(data["0"]["email"]);
      });
  }, []);

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
          `http://127.0.0.1:8000/api/user/update/${id}`,
          {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordR,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        nav("/dashboard/users");
      }
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(err.response.status);
      }
      console.log(err);
      SetAccept(true);
    }
  }
  return (
    <div>
      <h2>Update User</h2>
      <div className="father">
        {/* <Form
          myBTN="Update"
          name={name}
          email={email}
          endPoint={`user/update/${id}`}
          navigator="dashboard/users"
          emailLocalst={false}
          hasBTNsytle={true}
        /> */}
        <form
          onSubmit={Submit}
          style={{
            form,
            height: "80vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
