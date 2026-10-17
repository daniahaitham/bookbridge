import React from "react";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell,
  ResponsiveContainer, LabelList, Legend
} from "recharts";
import "../Styles/AdminStatistic.css";
import { BASE } from "../config.js";




function AdminStatistic({ books }) {
// we should do statistics on data when we bring it from the API
const COLORS = ["#d4c88c", "#f1c9d4ff"];
const [Req, setReq] = useState([]); //TABLE AND LINE 


//--------------------PIEWORK : bookk type ------------------
// to count by type 
 const typeCounts  = { sell: 0, exchange: 0 };
  for (const b of books) {
    
    //a problem in strings names !!!!!
    const cat = b.category //check the string how it is written
    if (cat === "sell") 
      typeCounts .sell++;
    else if (cat === "exchange") 
      typeCounts .exchange++;
   }


  const booksByType = [
    { name: "sell", value: typeCounts .sell },
    { name: "exchange", value: typeCounts .exchange }
  ].filter(d => d.value > 0);//if zero counter remove 


//------bar work : req status -----------------
  useEffect(() => {
    (async () => {
      try {

         const res = await fetch(`${BASE}/api/req`);
         console.log(res);
        if (!res.ok) 
          throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

          setReq(json.requests);

       } catch (e) {
        setReq([]);
      } 
    })();
  }, []);


  const reqStates  = { accepted: 0, rejected: 0, pending:0 };
  for (const c of Req) {

     const p = c.status  
    if (p === "accepted") 
      reqStates.accepted++;
    else if (p === "rejected") 
      reqStates.rejected++;
    else if (p === "pending") 
      reqStates.pending++;

   }


  const reqTotals = [
    { name: "accepted", value: reqStates.accepted },
    { name: "rejected", value: reqStates.rejected },
    { name: "pending", value: reqStates.pending }

  ].filter(d => d.value > 0);//if zero counter remove 


//--------------book availabilty ------------------

 const availabilityCounts  = { isAvailable: 0, notAvailable: 0 };
  for (const b of books) {
    
    
     if (b.availability  === true) availabilityCounts.isAvailable++;
    else if (b.availability === false) availabilityCounts.notAvailable++;
   }


  const availabetytotals = [
    { name: "isAvailable", value: availabilityCounts.isAvailable },
    { name: "notAvailable", value: availabilityCounts.notAvailable }
  ].filter(d => d.value > 0);//if zero counter remove 



 

  return (
    <section className="admin-analysis">
      <h3>Analysis</h3>
      <div className="analysis-grid">

    
       <div className="analysis-box">{/*Pie chart */}
          <PieChart width={200} height={160}>
            <Pie data={booksByType} dataKey="value" nameKey="name" outerRadius={60}  animationDuration={7000}  >
              {booksByType.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />{/* this tool provide the info about the data i am pointing to */}
          </PieChart>
          <p>Books by type</p>
        </div>



        <BarChart width={260} height={180} data={reqTotals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" animationDuration={7000} fill="#f1c9d4ff" />
            </BarChart>           




      <div className="analysis-box">{/*Pie chart */}
            <PieChart width={200} height={160}>
              <Pie data={availabetytotals} dataKey="value" nameKey="name" outerRadius={60} animationDuration={7000}>
                {availabetytotals.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />{/* this tool provide the info about the data i am pointing to */}
            </PieChart>
            <p>Availability of books offred </p>
          </div>


 

      </div>
    </section>
  );
}
export default AdminStatistic;