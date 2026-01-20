import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardForm from "../components/CardForm";
import { getCards, updateCard } from "../services/api";

export default function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCard() {
      try {
        const cards = await getCards();
        const card = cards.find((c) => String(c.id) === id);
        if (card) setInitialValues(card);
        else setError("Card not found.");
      } catch (err) {
        setError("Failed to fetch card details.");
      }
    }
    loadCard();
  }, [id]);

  async function handleSubmit(values) {
    setBusy(true);
    // Clear previous errors before trying again
    setError(""); 
    
    try {
      await updateCard(id, values);
      navigate("/cards");
    } catch (err) {
      setError("Failed to update card.");
    } finally {
      setBusy(false);
    }
  }

  // Only block the page if we don't have data yet
  if (!initialValues && !error) return <p>Loading card data...</p>;
  if (!initialValues && error) return <p>{error}</p>;

  return (
    <main className="form-container">
      <h1>Edit Card</h1>
      <CardForm 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        busy={busy} 
        // Pass the error here so it shows inside the form!
        error={error} 
      />
    </main>
  );
}