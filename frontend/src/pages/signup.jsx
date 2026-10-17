
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Signup.css";
import { BASE } from "../config.js";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({

    //giving initial value for the brobarties 
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });


  
  function onChange(e) {
  const { name, value } = e.target;
  setForm(prev => ({...prev, [name]: value }));
}


async function onSubmit(e) {
  e.preventDefault();

  if (!form.name || !form.email || !form.password) {
    alert("Please fill required fields");
    return;
  }
  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const res = await fetch(`${BASE}/api/auth/signup`, {//interpolation here 
      method: "POST",//this option is built in fetch telling the server the action
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({//turn from js to request row to be sent in the URL ( just like we used in the postman !)
        name: form.name,
        email: form.email,
        phonenum: form.phone, 
        password: form.password
      })
    });

    const data = await res.json();//server rel=ply is raw test so i have to reconvert to json
    if (!res.ok) {//also ok is built in the fetch ( just like we used to see in the error types and so on)
      alert(data.message || "Signup failed");
      return;
    }

    alert("Account created! Please log in.");
    navigate("/login");
  } catch (err) {
    alert("Network error");
  }
}


  return (
    <main>
      
      <section>
         <div className="content">
            <h1>Hello!</h1>
            <p>Create your account to start exploring books.</p>
          </div>
        <div>
          <form onSubmit={onSubmit}>
            <div> {/*value tells that whatever is in the form.name object should be the displayed*/}
              <input name="name" placeholder="Name" value={form.name} onChange={onChange} />
            </div>

            <div>
              <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} />
            </div>

            <div>
              <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} />
            </div>

            <div>
              <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={onChange} />
            </div>

            <div>
              <input name="phone" type="tel" placeholder="Phone number" value={form.phone} onChange={onChange} />
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>

        
         
       
      </section>
    </main>
  );
}

export default Signup;
