/**
 * src/components/Card.js
 */
import { Link } from "react-router-dom";

export default function Card({ card, onDelete }) {
  return (
    <div className="card">
      <img 
        src={card.card_pic} 
        alt={card.card_name} 
        style={{ width: "100%", height: "200px", objectFit: "cover" }} 
      />
      <div className="container">
        <h3>{card.card_name}</h3>
        <p>ID: {card.id}</p>
        
        <Link to={`/cards/${card.id}/edit`}>
          <button>Edit</button>
        </Link>
        
        <button 
          onClick={() => onDelete(card.id)} 
          style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}