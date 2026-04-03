import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("https://social-app-xaua.onrender.com/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      window.location = "/feed";

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={login}>
          Login
        </button>

        <p onClick={() => (window.location = "/signup")}>
          Create Account
        </p>
      </div>
    </div>
  );
}

export default Login;
