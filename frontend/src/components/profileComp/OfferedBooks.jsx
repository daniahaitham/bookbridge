import BookCard from "../BookCard";

export default function OfferedBooks({ books, onEdit, onDelete, editingId, onSave })
 {  if (!books?.length) return <p>No books yet.</p>;
//here i will render the recived data without fetch

  return (
    <div className="">
      {books.map((b) => 
      
      //the key here is only for safty to avoid bugs in react dome 
      (<div key={b.id} className="book-with-footer">
          <BookCard
            id={b.id}
            title={b.title}
            owner="Me"
            exchangeType={b.category}
            cover={b.cover}
          />

          <div className="card-footer">

            <>{/*remember the flow: in parent i sent the prponme called onEdit that will run the startedit function that excepts from me a book to st its id using the useState i defines  */}</>
            <button className="edit-btn" onClick={() => onEdit(b)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(b.id)}>Delete</button>
          </div>


         <>{/*here is the use of the id i saved in the parent */} </>
         
            {editingId === b.id && (
            
            <form className="edit-form" onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);//this crrate the formdata (collecting the inputs)
                const values = Object.fromEntries(fd.entries()); //now chnage this form obj to js obj ( in parent i will convert to json when i use it in the )
                onSave(b.id, values);  
            }}>
            
              <input name="title" defaultValue={b.title} placeholder="Title" />
              <input name="author" defaultValue={b.author} placeholder="Author" />
              <input name="price" defaultValue={b.price} placeholder="Price" />
              <input name="category" defaultValue={b.category} placeholder="Category" />
              <textarea name="description" defaultValue={b.description} placeholder="Description" />
              <input name="notebyowner" defaultValue={b.notebyowner} placeholder="Note by owner" />
              <input name="cover" defaultValue={b.cover} placeholder="Cover URL" />
              <input name="availability" defaultValue={b.availability} placeholder="Availability" />


              <div className="edit-actions">
                <button type="submit">Save</button>
               </div>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
