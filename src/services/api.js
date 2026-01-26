const API_URL = process.env.REACT_APP_API_URL || "";

// 1. Rename to a clearer name and use it consistently
function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(credentials) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  // Check if request failed
  if (!res.ok) {
    // 1. Try to parse the JSON body of the error response
    const errorData = await res.json().catch(() => ({}));
    
    // 2. Throw the specific message from backend (check both 'message' and 'error' keys)
    //    If neither exists, fall back to the status code.
    throw new Error(errorData.message || errorData.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function getCards() {
  const res = await fetch(`${API_URL}/allcards`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function addCard(card) {
  const res = await fetch(`${API_URL}/addcard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // <--- FIXED FUNCTION NAME (matches line 4)
    },
    body: JSON.stringify(card),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function updateCard(id, card) {
  const res = await fetch(`${API_URL}/updatecard/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(), // <--- ADDED TOKEN HERE
    },
    body: JSON.stringify(card),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function deleteCard(id) {
  const res = await fetch(`${API_URL}/deletecard/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeader(), // <--- ADDED TOKEN HERE
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}