const LoginAction = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://byteforce.caohoangphuc.id.vn/nodejs/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginName: email, password }),
        }
      );

      const data = await response.json();
      console.log("User logged in:", data);

      if (data.status === "true") {
        dispatch({ type: "LOGIN_SUCCESS" }); // Dispatch action thành công
      } else {
        dispatch({ type: "LOGIN_FAILED" }); // Dispatch action thất bại
      }
    } catch (error) {
      console.log("Login failed: " + error.message);
      dispatch({ type: "LOGIN_ERROR", payload: error.message }); // Dispatch lỗi nếu có
    }
  };
};

export default LoginAction;
