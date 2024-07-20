import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const UnProtected = (props) => {
  const {getCookie} = useContext(AppContext)
  // console.log(props.userLoggedIn)
  if (!getCookie('token') && !getCookie('refreshToken')) {
    return props.children;
  }
    return window.location.assign('/athena-homepage')
};

export default UnProtected;