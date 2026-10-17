import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";
import OfferedBooks from "../components/profileComp/OfferedBooks";
import IncomingReq from "../components/profileComp/IncomingReq.jsx";
import MyRequests from "../components/profileComp/MyRequests.jsx";
import "../Styles/Profile.css";
import { BASE } from "../config.js";


export default function Profile() {


const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

 //for each section in my profile i will have a state 
const [gotBooks, setGotBooks] = useState([]);
const [myRequests, setMyRequests] = useState([]);
const [offeredBooks, setOfferedBooks] = useState([]);
//in first section 
const [editingId, setEditingId] = useState(null);//to remember which book is edited
//in sec section :
const [incomingRequests, setIncomingRequests] = useState([]);








//for ethe prfile data rendering: 
useEffect(() => {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  if (!user?.id) return;


  (async () => {
    try {
      const res = await fetch(`${BASE}/api/users/${user.id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load profile");

       setProfile({
        name: data.name || "",
        email: data.email || "",
        phone: data.phonenum || "",
        password: data.password || "", 
      });
    } catch (e) {
      e.message;
    }
  })();
}, []);





//books i offer (1 st sec ) :
useEffect(() => {//CHANGE on data when mount 
    const stored = localStorage.getItem("user");//this gives back a string
    const user = stored ? JSON.parse(stored) : null; //PASRE BACK TO json SO I CAN USE IT 
      if (!user || !user.id) {
        return;  // stop early if no user
      }

  (async () => {
    try {
      const res = await fetch(`${BASE}/api/books?userid=${user.id}`);//res have obj include headers and body..
      //the ? where the backend know that here is the paramter 
      const data = await res.json();//conver this raw to JS obj


      if (!res.ok) {
       throw new Error(data.error || "Failed to load books");
      } 
      setOfferedBooks(data.books || []);// the empty array is for safty if tnohgin returned
    } catch (e) {
     e.message;
          }
        })();
      }, []);
 


//this fucntin will be sent as prp t o the onDelte.
const handleDelete = async (bookId) => {
  try {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;
    if (!user?.id) 
      {throw new Error("Not logged in");}

    const res = await fetch(`${BASE}/api/books/${bookId}?userid=${user.id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error(data.error || "Failed to delete book");
    }


    //passing function to the state , and prev include the current array of data , that happened when i rendred them in the async 
    //filter is used to keep only the conditions when it is true 
     setOfferedBooks((prev) => prev.filter((b) => b.id !== data.id));
  } catch (e) {
    e.message || "Delete failed"
  }
};

//EDTING:
const startEdit = (book) => setEditingId(book.id);//when i edit i willcall it to set the id on the editid
   
const saveEdit = async (bookId, values) => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) throw new Error("Not logged in");

    const res = await fetch(`${BASE}/api/books/${bookId}?userid=${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values), //remember thta i am converting it beocuse i recived it from thr colid as js obj
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Update failed");

    //i am passing arraw function to the state
    setOfferedBooks(prev => prev.map(b => (b.id === bookId ? data.book : b)));//replace the whole book when u find it 
    setEditingId(null); // close the form
  } catch (e) {
    e.message || "Update failed"
  }
};



//--------------------------------------------------------------------



//books i got from others 

useEffect(() => {
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;
  if (!user) return;


  (async () => {
    try {
      const res = await fetch(`${BASE}/api/req/got?requesterid=${user.id}`);
      const data = await res.json();
      setGotBooks(data.requests || []);
    } catch (e) {
      console.error("Failed to load got books:", e);
      setGotBooks([]);
    }
  })();
}, []);



//--------------------------------------------------------------------




//my Requests section : 

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return;

  (async () => {
    try {
      const res = await fetch(`${BASE}/api/req/mine?requesterid=${user.id}`);
      const { requests } = await res.json();//take the request array from the resonse
      setMyRequests(requests || []);
    } catch {
      setMyRequests([]);
    }
  })();
}, []);


//--------------------------------------------------------------------





// incomeing req:
useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const ownerid = user.id || user.userid;
      if (!ownerid) return;  
      (async () => {
          try {
            const res = await fetch(`${BASE}/api/req/incoming?ownerid=${ownerid}`);
            const j = await res.json();//cinverting to js obj 

            setIncomingRequests(j.requests || []); //this udates the states with the needed ata
            } catch {
            setIncomingRequests([]);//settin empty 
            }
      })();
    }, []);


//funs for accepting and rejecting          
const accept = async (id) => {
    //to find wich books that i accepted ?
    const reqObj = incomingRequests.find(r => r.id === id);

      try {
          const res = await fetch(`${BASE}/api/req/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "accepted" })
          });
          
 
          if (!res.ok) throw new Error("Update failed");


          setGotBooks(prev => [
            {//i want to put this new book at front
              id: reqObj.bookid,
              title: reqObj.title,
              cover: reqObj.cover,
              owner: reqObj.ownerid,
              exchangeType: "accepted"
              },
              ...prev
              ]);

              // remove the accepted from the requests tracking section 
              setIncomingRequests(prev => prev.filter(r => r.id !== id));
            } catch (e) {
              console.error(e);
            }
          };

//exacylt the samw of what i am doing in the accroting but not moving it to ssic section 
  const reject = async (id) => {
  try {
    await fetch(`${BASE}/api/req/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rejected" }),
    });

    // update  state 
    setIncomingRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status: "rejected" } : r)
    );
  } catch (err) {
    console.error("Error rejecting request:", err);
  }
};






  return (
    <main className="prof-page">
      <h2 className="prof-title">My Profile</h2>

      <div className="prof-fields">
        <div className="prof-field">{profile.name || "Name"}</div>
        <div className="prof-field">{profile.email || "Email"}</div>
        <div className="prof-field">••••••</div>
        <div className="prof-field">{profile.phone || "Phone num"}</div>
      </div>


      

      {/* the books i offer  */}
      <section className="prof-section">
       
          <h3 className="prof-heading">Books I offer</h3>
          <Link className="prof-add-btn" to="/NewBook">+ add a book</Link>
       

        <div className="prof-grid">
          <OfferedBooks books={offeredBooks} onEdit={startEdit} onDelete={handleDelete} editingId={editingId}
          onSave={saveEdit} />
        </div>
      </section>



      {/*  books i got from others */} 
        <section className="prof-section">
          <h3 className="prof-heading">Books Got from Others</h3>
          <div className="prof-grid">
            {gotBooks.map(b => <BookCard key={b.id} {...b} />)}
          </div>
        </section>



        {/* my requests */}
        <section className="prof-section">
          <h3 className="prof-heading">My Requests for others' books</h3>
          <MyRequests requests={myRequests} />
        </section>
       


        {/* incoming requests */}
            <section className="prof-section">
            <h3 className="prof-heading">Incoming Requests</h3>
            <IncomingReq requests={incomingRequests} onAccept={accept} onReject={reject} />
            </section>
    </main>
  );
}
