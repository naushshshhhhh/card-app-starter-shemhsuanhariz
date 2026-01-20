import { useState, useEffect } from "react";

export default function CardForm({ initialValues, onSubmit, busy, error }) {
  const [values, setValues] = useState({
    card_name: "",
    card_pic: "",
  });

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

      {/* NEW: Image Preview Section */}
      {values.card_pic && (
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <label style={{ display: "block", marginBottom: "5px", fontSize: "0.8rem", color: "#64748b" }}>
            Image Preview:
          </label>
          <img 
            src={values.card_pic} 
            alt="Preview" 
            style={{ 
              maxWidth: "100%", 
              maxHeight: "200px", 
              borderRadius: "8px", 
              border: "1px solid #e2e8f0",
              objectFit: "contain"
            }} 
            // Hides the broken image icon if the URL is invalid
            onError={(e) => e.target.style.display = 'none'}
            onLoad={(e) => e.target.style.display = 'block'}
          />
        </div>
      )}

      {error && <div className="error-message" style={{color: 'red', marginTop: '10px'}}>{error}</div>}

      <button type="submit" disabled={busy} className="button primary" style={{marginTop: '20px'}}>
        {busy ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}