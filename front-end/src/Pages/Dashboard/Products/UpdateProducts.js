import { useContext, useEffect, useState } from "react";
import Form from "../../../Components/Forms/Form";
import { User } from "../../Website/Context/UserContext";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import "./../../../style.css";

export default function UpdateProducts() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  console.log(image);
  const [accept, SetAccept] = useState(false);
  //   const [flag, SetFlag] = useState(false);
  //   const [descriptionError, setDescriptionError] = useState(false);
  const context = useContext(User);
  const token = context.auth.token;
  const nav = useNavigate();
  // useEffect(() => {
  //   setTitle(props.title);
  //   setDescription(props.description);
  // }, [props.title, props.description]);
  const id = window.location.pathname.split("/").slice(-1);
  const form = {
    boxShadow: "0px 0px 48px 8px rgba(0, 0, 0, 0.3)",
    width: "400px",
  };
  const btnStyle = {
    width: "100%",
  };
useEffect(() => {
  fetch(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      setTitle(data["0"]["title"]);
      setDescription(data["0"]["description"]);
      setImage(data["0"]["image"]);
    });
}, []);
  async function Submit(e) {
    let flag = false;
    e.preventDefault();
    SetAccept(true);
    if (title === "" || image.length < 6) {
      flag = false;
    } else flag = true;
    try {
      if (flag) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        let res = await axios.post(
          `http://127.0.0.1:8000/api/product/update/${id}`,
          formData,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        nav("/dashboard/products/");
      }
    } catch (err) {
      console.log(err);
      SetAccept(true);
    }
  }
  return (
    <div className="father">
      {/* <Form
        endPoint="user/create"
        descriptionLocalst={false}
        navigator="dashboard/users"
        hasBTNsytle={true}
        myBTN="Create"
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
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title..."
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        {title === "" && accept && (
          <p style={{ color: "red" }}>title required</p>
        )}
        <label htmlFor="description">Description</label>
        <input
          type="text"
          placeholder="Description..."
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        {/* {accept && descriptionError === 422 && (
          <p>description has Already Been Taken</p>
        )} */}
        <label htmlFor="pass">Image</label>
        <input
          type="file"
          placeholder="Image..."
          id="image"
          onChange={(e) => setImage(e.target.files.item(0))}
        ></input>
        {/* {image.length < 6 && accept && (
          <p style={{ color: "red" }}>image should be more than 6 character</p>
        )} */}

        {/* {imageR !== image && accept && (
          <p style={{ color: "red" }}>image doesn't match</p>
        )} */}
        <div className="register" style={btnStyle}>
          <button type="submit" style={btnStyle}>
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}
