import { Link } from "react-router-dom";

export default function Card({ card, onDelete, busy }) {
  return (
    <div className="card">
      {/* Display image if it exists, otherwise show a placeholder text */}
      {card.card_pic ? (
        <img src={card.card_pic} alt={card.card_name} className="card-image" />
      ) : (
        <div className="card-placeholder">No Image</div>
      )}
      
      <div className="card-content">
        <h3>{card.card_name || "Unnamed Card"}</h3>
        <p>ID: {card.id}</p>
        
        <div className="card-actions">
          <Link to={`/cards/${card.id}/edit`} className="button secondary">
            Edit
          </Link>
          <button 
            onClick={() => onDelete(card.id)} 
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