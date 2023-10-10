import { useState, useEffect } from "react";
import vector from "../assets/vector.png";
import vector2 from "../assets/vector2.png";
import Login from "../assets/Login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../store/actions/actionCreator";
import InputComponent from "../components/InputComponent";

export default function LoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
  });

  const handleRegister = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newRegisterForm = {
      ...registerForm,
    };

    newRegisterForm[field] = value;
    setRegisterForm(newRegisterForm);
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    await axios({
      method: "POST",
      url: baseUrl + "/users/register",
      data: registerForm,
    });
    setLoginForm({
      username: registerForm.username,
      password: registerForm.password,
    });
    setLogin(true);
  };

  const handleLogin = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginForm = {
      ...loginForm,
    };

    newLoginForm[field] = value;
    setLoginForm(newLoginForm);
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    const { data } = await axios({
      method: "POST",
      url: baseUrl + "/users/login",
      data: loginForm,
    });
    sessionStorage.setItem("access_token", data.access_token);
    navigate("/");
  };

  useEffect(() => {
    setLogin(true);
  }, []);

  const handleLoginView = (e) => {
    e.preventDefault();
    setLogin(!login);
  };
  return (
    <>
      <div className="container">
        <img
          className="background-top"
          src={vector}
          alt="vector"
        />
        <img
          className="background-bot"
          src={vector2}
          alt="vector2"
        />
        <div className="left">
          <div className="title">
            <h1>TO DO LIST</h1>
          </div>
          <div className="image">
            <img
              src={Login}
              alt="Placeholder"
            />
          </div>
        </div>
        <div className="right">
          <h3>Welcome to To Do List</h3>
          <p>Please sign-in to your account, and start manage further 👋</p>

          {/* login */}

          {login ? (
            <>
              <div
                className="login"
                id="login"
              >
                <form onSubmit={submitLogin}>
                  <InputComponent
                    type="text"
                    name="username"
                    value={loginForm.username}
                    placeholder="Your regist username"
                    change={handleLogin}
                    label="Username"
                  />
                  <InputComponent
                    type="password"
                    name="password"
                    value={loginForm.password}
                    placeholder="****"
                    change={handleLogin}
                    label="Password"
                  />
                  <input
                    type="submit"
                    value="Sign In"
                  />
                </form>
              </div>
              <div className="login-footer">
                <p>
                  Don't have any account yet?{" "}
                  <span
                    href="#"
                    onClick={handleLoginView}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            </>
          ) : (
            <div
              className="login"
              id="register"
            >
              <form onSubmit={submitRegister}>
                <label>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  onChange={handleRegister}
                />
                <label>Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phoneNumber"
                  placeholder="+62"
                  onChange={handleRegister}
                />
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@mail.com"
                  onChange={handleRegister}
                />
                <label>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Your username"
                  onChange={handleRegister}
                />
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="*****"
                  onChange={handleRegister}
                />
                <input
                  type="submit"
                  value="Sign Up"
                />
              </form>
              <div className="login-footer">
                <p>
                  Already have an account?{" "}
                  <span onClick={handleLoginView}>Login</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
