 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import "../Styles/Login.css";  
import { BASE } from "../config.js";


function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  function onChange(e) { //this is fired each time the user type new thing on <input>
    setForm({ ...form, [e.target.name]: e.target.value });//name is the name that is defined in the <inpit>
  }

  


  async function onSubmit(e) {
  e.preventDefault();

  try {
    const res = await fetch(`${BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },//tell i am seding json 
      body: JSON.stringify({ //backedn except json 
        email: form.email,
        password: form.password
      })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    //json turn the result into string to be able to use in local
    //set item is from localstrorage to save the user 

    
     navigate("/Home");  
  } catch {
    alert("Network Poblrem ");
  }
}




  return (
    <main className="login-page">
      <section className="login-card">
       
        <div className="login-form-side">
          <h1 className="login-title--mobile">Welcome back</h1>
          <h2 className="login-subtitle--mobile">
            Sign in to continue exploring books.
          </h2>

          <form onSubmit={onSubmit} className="login-form">
            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true"> </span>
              <input className="input" name="email"  type="email" placeholder="Email" value={form.email} onChange={onChange} required
              />
            </div>

            <div className="input-wrap">
              <span className="input-icon" aria-hidden="true"> </span>
              <input className="input" name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
            </div>

            <button type="submit" className="btn-login">Log in</button>

            <p className="helper">
              New here? <Link to="/signup">Create an account</Link>
            </p>
          </form>
        </div>

  
        <aside className="login-welcome-side">
          <div className="welcome-copy">
            <h1>Welcome back</h1>
            <p>Sign in to continue exploring books.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default Login;
