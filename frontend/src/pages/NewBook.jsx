import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/NewBook.css";
import { BASE } from "../config.js";

function NewBook() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
  title: "",
  author: "",
  price: "",
  category: "sell",     
  description: "",
  notebyowner: "",
  cover: "", 
  availability: true
  });

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm(f => ({ ...f, [name]: checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }


async function onSubmit(e) {
  e.preventDefault();

  if (!form.title || !form.author || !form.category) {
    alert("Please fill Title, Author, and Category.");
    return;
  }


  //here handle if thier is no user becouse this will cuse error
  const user = JSON.parse(localStorage.getItem("user"));//here i am retreviing the user i saved in the local storage 
  //parsing to change BACK from string to JS to be able to use the data
  if (!user) {
    alert("Please log in first.");
    return;
  }

  try {
    const res = await fetch(`${BASE}/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },//telling server i am sending JSON data
      body: JSON.stringify({//turning JSON to string to be able to be used in fetch
        userid: user.id,             
        title: form.title,
        author: form.author,
        price: form.price,
        category: form.category,     
        description: form.description,
        notebyowner: form.notebyowner,
        cover: form.cover,    
        availability: form.availability
      })
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Could not add book");
      return;
    }

    alert("Book added!");
    navigate("/profile");
  } catch {
    alert("Network error");
  }
}


   

  return (
    <main className="ab-page">
      <h1 className="ab-title">Provide new book</h1>
      <p className="ab-sub">
        Please fill the form below to offer your book to other users!
      </p>

      <section className="ab-card">
        <form className="ab-form" onSubmit={onSubmit}>
          <input className="ab-input"  name="title"  placeholder="Title"  value={form.title}  onChange={onChange} />

          <input className="ab-input"  name="author"  placeholder="Author"  value={form.author}  onChange={onChange} />

          <textarea  className="ab-input ab-textarea" name="description"  placeholder="Description"  value={form.description}  onChange={onChange} rows={3} />

          <select  className="ab-input"  name="category"  value={form.category} onChange={onChange}>
            <option value="sell">Sell</option>
            <option value="borrow">Borrow</option>
            <option value="exchange">Exchange</option>
          </select>


          <input className="ab-input"   name="price" placeholder="Price or Duration" value={form.price} onChange={onChange} />

          <label className="ab-field">
                <span className="ab-label">Availability</span>


                {/*problem is that the selecet always return String and i am using avaiavlitiy as boolean  */}
                <select className="ab-input"  name="availability"  value={form.availability ? "true" : "false"}   //DISAPLYING
                 onChange={(e) => setForm((f) => ({ ...f, availability: e.target.value === "true" })) //IF THE AVAILIBITY STRING IS "TRUE" save it in the form Boolean true ( BECOUSE IT IS ) 
                }> 


                    <option value="true">Available</option> {/*string */}
                    <option value="false">Not Available</option>
                </select>
        </label>

          <textarea className="ab-input" name="notebyowner" placeholder="Note by owner"
          value={form.notebyowner} onChange={onChange} /> 


          <label className="ab-file">
          <span className="ab-label">Cover Image URL</span>
        <input className="ab-input" name="cover" type="text"  placeholder="Paste image link (you can get it from you drive)" value={form.cover} onChange={onChange}
          /> 
          </label>

          <button type="submit" className="ab-done">DONE</button>
        </form>
      </section>
    </main>
  );
}

export default NewBook;
