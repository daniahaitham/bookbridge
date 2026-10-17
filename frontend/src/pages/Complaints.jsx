import React from "react";
import {Link} from "react-router-dom";
import { useState } from "react";
 import "../Styles/Complaints.css";
import { BASE } from "../config";


function Complaints() {
 
    const [form, setForm] = useState({
        subject: "",
        description: "",
        priority: "low"
    });

    //handle the submission error
  async function onSubmit(e) {
  e.preventDefault();
  if (!form.subject || !form.description) {
    alert("Please fill required fields");
    return;
  }


  //I HAVE TO KNOW whom is the user did this req
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  try {
    const res = await fetch(`${BASE}/api/complaints`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userid: user.id || null,
        subject: form.subject,
        description: form.description,
        priority: form.priority
      })
    });
    //const data = await res.json();
    alert("Complaint submitted successfully!");

    } catch (err) {
              alert(err.message);
    }
    }


     function onChange(e) { //here !!

      //targer is always the html eleement that triggred the chanfe
      const { name, value } = e.target;//dont forget this is destructuring , = e.target.name
      setForm({ ...form, [name]: value });
        }


    return (
        <section>
            <h1 className="title">Complaints</h1>
            <p>
                Please fill the form below to submit your complaint. Our team will review it
        and get back to you as soon as possible.
            </p>

            <form onSubmit={onSubmit}>
               
                    <input type="text" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                    <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>

                    <select name="priority" value={form.priority} onChange={onChange}> <>{/*from here is the name and value  */}</>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <button type="submit">SUBMIT</button>
            </form>
        </section>
    );
}

export default Complaints;