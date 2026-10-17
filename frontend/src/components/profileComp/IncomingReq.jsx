import BookCard from "../BookCard";

export default function IncomingReq({ requests, onAccept, onReject }) {
  if (!requests?.length) return <p>No requests yet.</p>;

  return (
    <div className="prof-grid">
      {requests.map((r) => (
        <div key={r.id} className="book-with-footer">
          <BookCard
            id={r.bookid}
            title={r.title}         
            owner={r.requesterid}
            exchangeType={r.status}
            cover={r.cover}
          />
          <div className="card-footer">
            {r.status === "pending" ? (
              <>
                <button className="btn-circle ok" onClick={() => onAccept(r.id)}>Accept</button> {/**calling back */}
                <button className="btn-circle danger" onClick={() => onReject(r.id)}>Reject</button>
              </>
            ) : (
              <span>{r.status}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
