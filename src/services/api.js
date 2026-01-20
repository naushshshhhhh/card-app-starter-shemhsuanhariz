// API Service
const API_URL = "https://onlinecardappwebservice-0fgy.onrender.com";

export async function getCards() {
  try {
    const res = await fetch(`${API_URL}/allcards`);
    if (!res.ok) {
      throw new Error(`Error fetching cards: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Fetched Cards Data:", data); // View this in Browser Console
    return data;
  } catch (error) {
    console.error("API Service Error:", error);
    throw error;
  }
}

export async function addCard(card) {
  const res = await fetch(`${API_URL}/addcard`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(card),
  });
  if (!res.ok) throw new Error(`Error adding card: ${res.status}`);
  return res.json();
}

export function addCard(card) {
  // TODO: implement POST /addcard
}

export function updateCard(id, card) {
  // TODO: implement PUT /updatecard/:id
}

export function deleteCard(id) {
  // TODO: implement DELETE /deletecard/:id
}
