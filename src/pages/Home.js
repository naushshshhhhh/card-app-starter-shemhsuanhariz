import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="page centered-container">
      <div className="home-content">
        <h1>Welcome to our Card App</h1>
        <p>
          This web application allows you to manage a collection of cards. 
          You can view, add, update, and delete cards from the database.
        </p>
        
        <Link to="/cards" className="button primary">
          View All Cards
        </Link>

        <div className="home-footer">
          <small>
            Made by Hariz, Chih Hsuan and Shem (but not really Shem because she was sick but she's morally supporting us from her bed)
          </small>
        </div>
      </div>
    </main>
  );
}