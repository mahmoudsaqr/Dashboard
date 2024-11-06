import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Website/Context/UserContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [counter, setCounter] = useState(0);
  const context = useContext(User);
  const userToken = context.auth.token;
  const userdet = context.auth.userDetails;
  console.log(userdet);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + userToken,
        },
      })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((er) => console.log(er));
  }, [counter]);
  console.log(userToken + " *** After refresh");
  function deleteUser(id) {
    axios
      .delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
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
  const showUsers = users.map((users, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{users.name}</td>
      <td>{users.email}</td>
      <td>
        <Link
          to={`${users.id}`}
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
          onClick={() => deleteUser(users.id)}
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
            <th>Username</th>
            <th>Email</th>
            <th>Update + Delete</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
      {/* <Link className="registen-nav" style={{position:"absolute"}} onClick={refresh}>
        Refresh Token
      </Link> */}
    </div>
  );
}
