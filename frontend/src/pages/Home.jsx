import { useState ,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard.jsx";
import AdminStatistic from "../components/AdminStatistic.jsx";
import AdminComplaints from "./AdminComplaints.jsx";
import "../Styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getRandomQuote } from "../api/quotes";
import { BASE } from "../config.js";

//for deployment ,we will have 
//  const BASE_UTL = import.meta.env.VITE_SERVER_URL


//3ED API WORK:
//qoute state
// a fucntion to call the api and fetch --> update the sate
// should use UseEffect to call that function once
// chnage UI to provide the quote in it 
//design it 

function Home() {
 const [books, setBooks] = useState([]);
const navigate = useNavigate(); 



//API work : funcion to fetch from api
const [quote,setQuote] = useState (null);


   useEffect(() => {
      (async () => {
        try {
          const text = await getRandomQuote();
          console.log("QUOTE OK:", text);
          setQuote(text);
        } catch (e) {
          console.error("QUOTE ERROR:", e);
          setQuote("Keep turning pages. Every chapter counts.");
        }
    })();
    }, []);

        



  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE}/api/books/all`);

        if (!res.ok) 
        throw new Error(`HTTP ${res.status}`);

        const j = await res.json();//from strings to JSON
          setBooks(j.books || []);//the empty one for safty if reciving undefined  
            } catch (e) {
         console.error("Failed to load books:", e);
          setBooks([]); //keep it as array even when eeror
         }
    })();
  }, []);






//ADMIN WORK 
const [user, setUser] = useState(null);

      useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) setUser(JSON.parse(saved));
      }, []);
      const isAdmin = user && user.is_admin;



  return (

      <>
       <div className="quote-label">Today’s Quote:</div>
        <div className="d-flex justify-content-center mt-2">
           
          <div className="alert alert-light border rounded-pill px-3 py-2 shadow-sm">
            <span className="fw-semibold">{quote}</span>
          </div>
        </div>
      
    <main className="home-page">
      <div className="home-container">
        <h1 className="home-title">
          Explore thousands of books — borrow, buy, or exchange.
        </h1>


          <section className="book-grid">
            {books.map((b) => (  // dont forget map create new array 
             <div key={b.bookid} className="book-grid-item"> {/*key is needed from react to track item  */}
                <BookCard
                 id={b.id}
                 title={b.title}         
                 exchangeType={b.category}
                 cover={b.cover} />
               </div>
            ))}
          </section>







      {isAdmin && ( //this is the if jsx sysntax , it cheack the admin if truthy it somplte, if false (&&) this thing retrun false 
       <> 
           <AdminStatistic books={books} /> 
            <div style={{ marginTop: 16 }}>
            <AdminComplaints />
             </div>
       </>
      )}
  


    

      {!isAdmin && (
        <button
              className="btn btn-danger btn-lg shadow fw-bold rounded-pill position-fixed start-0 translate-middle-y ms-3"
              style={{ bottom: "40px", fontFamily: "Segoe UI", zIndex: 1050 }}
            onClick={() => navigate("/Complaints")}
        >
            + Add your Complaint for Admins
        </button>
      )}
       </div>
    </main>
    </>
  );
}
export default Home;
