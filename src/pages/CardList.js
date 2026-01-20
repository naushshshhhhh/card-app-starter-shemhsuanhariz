/**
 * src/pages/CardList.js
 */
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch data when page loads
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

  async function handleDelete(id) {
    if (!window.confirm("Delete this card?")) return;
    try {
      await deleteCard(id);
      setCards(cards.filter((c) => c.id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  }

  if (loading) return <p>Loading cards...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (cards.length === 0) return <p>No cards found.</p>;

  // Render the list
  return (
    <main className="card-grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} onDelete={handleDelete} />
      ))}
    </main>
  );
}