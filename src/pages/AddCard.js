import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm";
import { addCard } from "../services/api";

export default function AddCard() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(values) {
    setBusy(true);
    setError("");
    try {
      await addCard(values);
      navigate("/cards");
    } catch (err) {
      setError("Failed to add card.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="form-container">
      <h1>Add New Card</h1>
      {error && <p className="error">{error}</p>}
      <CardForm onSubmit={handleSubmit} busy={busy} />
    </main>
  );
}