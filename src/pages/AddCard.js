import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCard } from "../services/api";
import CardForm from "../components/CardForm";

export default function AddCard() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(values) {
    setBusy(true);
    setError("");

    try {
      await addCard(values);
      // On success, go back to the list
      navigate("/cards");
    } catch (err) {
      setError("Failed to add card. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page">
      <h1>Add New Card</h1>
      <CardForm 
        onSubmit={handleSubmit} 
        busy={busy} 
        error={error} 
      />
    </div>
  );
}