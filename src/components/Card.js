import { Link } from "react-router-dom";

export default function Card({ card, onDelete, busy }) {
  return (
    <div className="card">
      {/* Display the image if it exists */}
      {card.card_pic && (
        <img 
          src={card.card_pic} 
          alt={card.card_name} 
          style={{ width: "100%", height: "150px", objectFit: "cover" }} 
        />
      )}
      
      <div className="card-body">
        <h3>{card.card_name}</h3>
        <p><small>ID: {card.id}</small></p>
        
        <div className="card-actions">
          {/* FIXED: Updated URL to match App.js route */}
          <Link to={`/cards/${card.id}/edit`} className="button secondary">
            Edit
          </Link>

          {/* Delete button */}
          <button 
            onClick={() => onDelete(card)} 
            disabled={busy}
            className="button danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}