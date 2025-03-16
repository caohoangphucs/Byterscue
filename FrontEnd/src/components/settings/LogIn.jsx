import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Phone } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    yourName: "",
    loginName: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        // Đăng nhập
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginName: formData.loginName,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Lưu token
          localStorage.setItem("token", data.token);
          // Dispatch action LOGIN để cập nhật state
          dispatch({ type: "LOGIN" });
          // Đợi một chút để đảm bảo state đã được cập nhật
          await new Promise((resolve) => setTimeout(resolve, 100));
          // Chuyển hướng đến trang settings
          navigate("/settings");
          // Reset form
          setFormData({
            yourname: "",
            loginName: "",
            phone: "",
            password: "",
          });
        } else {
          setError(data.message || "Đăng nhập thất bại");
        }
      } else {
        // Đăng ký
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginName: formData.loginName,
            password: formData.password,
            yourname: formData.fullName,
            phone: formData.phone,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setIsLogin(true);
          setError("Đăng ký thành công! Vui lòng đăng nhập.");
          setFormData({
            yourname: "",
            loginName: "",
            phone: "",
            password: "",
          });
        } else {
          setError(data.message || "Đăng ký thất bại");
        }
      }
    } catch (err) {
      setError("Lỗi kết nối server");
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {isLogin ? "Đăng nhập" : "Tạo tài khoản mới"}
          </h2>
        </div>

        {/* Toggle Buttons */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-md font-medium ${
              isLogin
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Đăng nhập
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-md font-medium ${
              !isLogin
                ? "bg-indigo-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Đăng ký
          </motion.button>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="fullName" className="sr-only">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Họ và tên"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="loginName" className="sr-only">
                Tên đăng nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="loginName"
                  name="loginName"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Tên đăng nhập"
                  value={formData.loginName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Số điện thoại"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="password" className="sr-only">
                Mật khẩu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? "Đăng nhập" : "Đăng ký"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LogIn;
