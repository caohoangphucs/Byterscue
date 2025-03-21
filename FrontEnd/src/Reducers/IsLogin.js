const IsLogin = (state = false, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return true;
    case "LOGOUT":
      return false;
    case "REGISTER_SUCCESS":
      return true;
    default:
      return state;
  }
};
export default IsLogin;
