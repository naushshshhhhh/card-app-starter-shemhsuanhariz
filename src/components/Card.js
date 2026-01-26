import { Link } from "react-router-dom";

export default function Card({ card, onDelete, busy }) {
  return (
    <div className="card">
      {card.card_pic && (
        <img 
          src={card.card_pic} 
          alt={card.card_name} 
        />
      )}
      
      <div className="card-body">
        <h3>{card.card_name}</h3>
        <p><small>ID: {card.id}</small></p>
        
        <div className="card-actions">
          <Link to={`/cards/${card.id}/edit`} className="button secondary">
            Edit
          </Link>

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