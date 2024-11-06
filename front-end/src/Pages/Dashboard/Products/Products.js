import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function Products() {
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
      })
      .catch((er) => console.log(er));
  }, [counter]);
  console.log(userToken + " *** After refresh");
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
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{products.title}</td>
      <td>{products.description}</td>
      <td>
        <Link
          to={`${products.id}`}
          className="fa-solid fa-pen-to-square"
          style={{
            margin: "20px",
            fontSize: "20px",
            color: "#86b7fe",
            cursor: "pointer",
          }}
        ></Link>
        -
        <i
          onClick={() => deleteUser(products.id)}
          className="fa-solid fa-trash"
          style={{
            margin: "20px",
            fontSize: "20px",
            color: "red",
            cursor: "pointer",
          }}
        ></i>
      </td>
    </tr>
  ));
  // async function refresh(){
  //    try{
  //       axios
  //         .post("http://127.0.0.1:8000/api/refresh", null, {
  //           headers: {
  //             Accept: "application/json",
  //             Authorization: "Bearer " + userToken,
  //           },
  //         })
  //         .then((data) => context.setAuth((prev)=>{
  //           return { ...prev, token: data.data.token };
  //         }));
  //    }
  //    catch(err){
  //     console.log(err);
  //    }
  // }
  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description </th>
            <th>Update + Delete</th>
          </tr>
        </thead>
        <tbody>{showproducts}</tbody>
      </table>
      {/* <Link className="registen-nav" style={{position:"absolute"}} onClick={refresh}>
        Refresh Token
      </Link> */}
    </div>
  );
}
