import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const { setUser, setAlert } = useContext(AppContext);

  useEffect(() => {
    setUser({});
    setAlert({ msg: "LOGGED OUT", cat: "info" });
  }, [setUser, setAlert]);

  return (
    <>
      <Navigate to="/" />
    </>
  );
}
