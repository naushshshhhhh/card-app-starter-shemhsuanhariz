import { useState, useEffect } from "react";

export default function CardForm({ initialValues, onSubmit, busy, error }) {
  // Initialize state with props or default empty strings
  const [values, setValues] = useState({
    card_name: "",
    card_pic: "",
  });

  // If initialValues change (e.g. data loaded in EditCard), update state
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [initialValues]);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <div className="form-group">
        <label htmlFor="card_name">Card Name</label>
        <input
          type="text"
          id="card_name"
          name="card_name"
          value={values.card_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="card_pic">Image URL</label>
        <input
          type="url"
          id="card_pic"
          name="card_pic"
          value={values.card_pic}
          onChange={handleChange}
          required
        />
      </div>

      {/* NEW: Display error message if it exists */}
      {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}

      <button type="submit" disabled={busy} className="button primary">
        {busy ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}