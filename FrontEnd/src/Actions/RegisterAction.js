const RegisterAction = (email, password) => {
  return async (dispatch) => {
    try {
      const formData = {
        loginName: email,
        password: password,
        yourName: "123",
        phone: "123",
      };

      const response = await fetch(
        "https://byteforce.caohoangphuc.id.vn/nodejs/api/accounts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log(response);
      if (response.ok == false) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Dispatch action sau khi đăng ký thành công
      dispatch({ type: "REGISTER_SUCCESS" });
    } catch (error) {
      console.error("Registration failed: " + error.message);
      dispatch({ type: "REGISTER_FAILED" });
    }
  };
};

export default RegisterAction;
