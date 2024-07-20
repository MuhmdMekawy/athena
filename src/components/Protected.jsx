import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Protected = (props) => {
  const {getCookie} = useContext(AppContext)
  if (getCookie('token') || getCookie('refreshToken')) {
    return props.children;
  }
    return window.location.assign('/login')
};

export default Protected;