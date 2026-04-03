import { useState } from "react";
import axios from "axios";

function Signup() {
  const [data, setData] = useState({});

  const signup = async () => {
    try {
      await axios.post("https://social-app-xaua.onrender.com/api/auth/signup", data);
      alert("Signup successful");
      window.location = "/";
    } catch (err) {
      alert(err.response?.data || "Error");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Signup</h2>

        <input className="input" placeholder="Username" onChange={e => setData({...data, username:e.target.value})}/>
        <input className="input" placeholder="Email" onChange={e => setData({...data, email:e.target.value})}/>
        <input className="input" type="password" placeholder="Password" onChange={e => setData({...data, password:e.target.value})}/>

        <button className="btn" onClick={signup}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;
