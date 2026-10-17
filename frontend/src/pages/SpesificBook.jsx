import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Styles/SpesificBook.css";
import { BASE } from "../config.js";

function SpesificBook() {
  const { id } = useParams();//to get id from url

  const [book, setBook] = useState(null);

  useEffect(() => {
    async function loadBook() {
      try {
        const res = await fetch(`${BASE}/api/books/${id}`);
        const data = await res.json();
        setBook(data.book || null);
      } catch (err) {
        console.error("Failed to load book:", err);
        setBook(null);
      }
    }
    loadBook();
  },[]);  




//will be used on request
const user = localStorage.getItem("user");
const requesterid = user.id;


async function handleRequest() {
    try {
      const res = await fetch(`${BASE}/api/req/${book.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      requesterid, 
      ownerid: book.userid
      }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");

      alert("Request sent successfully!");
      } catch (err) {
          console.error(err);
          alert(err.message);
      }
      }




 
  if (!book) return <p className="bd-empty">Book not found.</p>;

  return (
    <>
      <h1 className="bd-title">Book Details</h1>
      <main className="bd-page">
        <section className="bd-wrap">
          <div className="bd-info">
            <h2 className="bd-head">
              {book.title} <span className="sep"> - </span> 
              {book.author}
          </h2>



          <p className="bd-desc">
            {book.description || " Description "}
          </p>

          <div className="bd-tags">
            <span className="tag">{book.category || "Exchange Type"}</span>
            <span className="tag light">{book.price || "Price / Duration"}</span>
          </div>

          <p className="bd-owner">

            <>{/*here thier are info from the users table !! */}</>
            <strong>Owner name and PhoneNum :</strong> {book.owner_name || "—"}
            <span>{" "}</span>
            <span>{book.owner_phone ||" "}</span>
          </p>

          <p className="bd-note">
            <strong>Note by owner:</strong>{" "}
            {book.notebyowner ||
              "… note"}
          </p>
        </div>

        
        <aside className="bd-side">
          <div className="bd-side-label">
            {String(book.availability) === "true" ? "Available" : "Not available"}
          </div>

          <div className="bd-frame">
             {book.cover ? (<img src={book.cover} alt={book.title} />)  
             :(<div className="bd-placeholder" aria-hidden="true" />)}
          </div>
        </aside>
          <button className="reqBook" onClick={handleRequest}>Request Book</button>
      </section>

    

    </main>
    </>
  );
}

export default SpesificBook;
