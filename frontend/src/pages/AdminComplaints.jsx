import React from "react";
import "../Styles/AdminComplaints.css";
import { useEffect, useState } from "react";
import { BASE } from "../config.js";

function AdminComplaints() {

  const [complaints, setComplaints] = useState([]);
 

 

  useEffect(() => {
    (async ()=> {
      try {
         const res = await fetch(`${BASE}/api/complaints`, {
          headers: { "x-role": "admin" }, //here i am sending a custom header with the req
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const rows = (data.complaints || []);
        setComplaints(rows);
        
      } catch (e) {
          e.error
      }
    })();
  }, []);




  return (
    <main className="adm-page">
      <div className="adm-header">
        <h2 className="adm-title">Complaint Page</h2>
      </div>

      <div className="adm-tablewrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>From</th>
              <th>Title/Sub</th>
              <th>Description</th>
              <th>Priority</th>
            
            </tr>
          </thead>

          <tbody>




            {complaints.length === 0 ? ( 
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No complaints</td>
              </tr>
            ) : (

              complaints.map((c) => (  
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.userid}</td> 
                  <td>{c.subject}</td>  
                  <td >{c.description }</td> 
                  <td>{c.priority}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default AdminComplaints;
