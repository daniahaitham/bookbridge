 import BookCard from "../BookCard";

export default function MyRequests({ requests = [] }) {
  if (!requests.length) return <p>No requests yet.</p>;

  return (
    <div className="prof-grid">
      {requests.map(r => (
        <div key={r.id} className="book-with-footer">
          <BookCard
            id={r.bookid}
            title={r.title}
            owner={r.ownerid}
            exchangeType="Requested"
            cover={r.cover}
          />
          <div className="card-footer">
            <span>{r.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
