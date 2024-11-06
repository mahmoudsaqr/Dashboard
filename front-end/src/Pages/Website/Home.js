import { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "./Context/UserContext";
import "./../../Pages/Dashboard/Products/Products.css";

export default function Home() {
  const [products, setproducts] = useState([]);
  const [counter, setCounter] = useState(0);
  const context = useContext(User);
  const userToken = context.auth.token;
  const userdet = context.auth.userDetails;
  console.log(userdet);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
      })
      .then((data) => {
        setproducts(data.data);
        console.log(data);
      })
      .catch((er) => console.log(er));
  }, [counter]);
  console.log(userToken + " *** After refresh");
  console.log(products);
  function deleteUser(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCounter(counter + 1);
        }
      })
      .catch((err) => console.log(err));
  }
  const showproducts = products.map((products, index) => (
    <Link to={"/viewproduct"} className="products" key={index}>
      <img
        src={products.image}
        alt={products.title}
        style={{ width: "200px", height: "200px" }}
      />
      <h2>{products.title}</h2>
      <p>{products.description}</p>
      <Link to={`/${products.id}`}>
        <i class="fa-solid fa-cart-plus" style={{ fontSize: "20px" }}></i>Add To
        Cart
      </Link>
    </Link>
  ));

  return (
    <div>
      <div style={{ backgroundColor: "#ebebeb", minHeight: "100vh" }}>
        <div
          style={{
            boxShadow: "1px 1px 10px 1px #bababa",
            backgroundColor: "white",
            position:"fixed",
            width:"100%"
          }}
        >
          <Header />
        </div>
        <div className="container">
          <div style={{ display: "flex", padding: "20px",flexWrap:"wrap" ,paddingTop:"73px"}}>{showproducts}</div>
        </div>
      </div>
    </div>
  );
}
