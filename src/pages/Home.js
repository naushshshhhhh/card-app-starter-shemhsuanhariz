import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-container">
      <h1>Welcome to the Card App</h1>
      <p>
        This application allows you to manage a collection of cards. 
        You can view, add, update, and delete cards from the database.
      </p>
      <Link to="/cards" className="button primary">
        View All Cards
      </Link>
    </main>
  );
}