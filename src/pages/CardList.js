import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCards();
        setCards(data);
      } catch (err) {
        setError("Failed to load cards. Please check your connection.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleDelete(card) {
    if (!window.confirm(`Delete ${card.card_name}?`)) return;
    
    try {
      await deleteCard(card.id);
      setCards((prevCards) => prevCards.filter((c) => c.id !== card.id));
    } catch (err) {
      alert("Failed to delete card.");
    }
  }

  if (loading) return <p>Loading cards...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="page">
      <div className="header-row" style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <h1>My Cards</h1>
        <button 
          onClick={() => navigate("/cards/new")} 
          className="button primary"
        >
          + Add Card
        </button>
      </div>

      {cards.length === 0 ? (
        <p>No cards found. Add one!</p>
      ) : (
        <main className="card-grid">
          {cards.map((card) => (
            <Card 
              key={card.id} 
              card={card} 
              onDelete={handleDelete} 
            />
          ))}
        </main>
      )}
    </div>
  );
}