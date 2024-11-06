import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../Context/UserContext";
import Cookies from "universal-cookie";
import Loading from "../../../Components/Loading";

export default function PersistLogin() {
  const context = useContext(User);
  const userToken = context.auth.token;
  const [loading, setLoading] = useState(true);
  const cookie = new Cookies();

  const getToken = cookie.get("Bearer");
  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post("http://127.0.0.1:8000/api/refresh", null, {
            headers: {
              Accept: "application/json",
              Authorization: "Bearer " + getToken,
            },
          })
          .then((data) => {
            cookie.set("Bearer", data.data.token);
            context.setAuth((prev) => {
              return { userDetails: data.data.user, token: data.data.token };
            });


          })
      } catch (err) {

        console.log(err);
      }finally{(setLoading(false))};
    }


    !userToken ? refresh() : setLoading(false);
  }, []);

  return loading ? <Loading /> : <Outlet />;
}
