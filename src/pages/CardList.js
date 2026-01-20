import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCards, deleteCard } from "../services/api";

export default function CardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getCards();
        // Safety check: Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setCards(data);
        } else {
          console.error("API response is not an array:", data);
          setError("Invalid data format received from server.");
        }
      } catch (err) {
        setError("Failed to load cards. Check console for details.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this card?")) return;
    try {
      await deleteCard(id);
      // Remove the deleted card from the UI immediately
      setCards((prevCards) => prevCards.filter((c) => c.id !== id));
    } catch (err) {
      alert("Failed to delete card.");
    }
  }

  if (loading) return <p>Loading cards...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (cards.length === 0) return <p>No cards found. Try adding one!</p>;

  return (
    <main className="card-grid">
      {cards.map((card) => (
        // We assume the database uses 'id' as the unique key
        <Card key={card.id} card={card} onDelete={handleDelete} />
      ))}
    </main>
  );
}