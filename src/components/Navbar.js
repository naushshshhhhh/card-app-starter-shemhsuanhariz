import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        <strong>Card App</strong>
      </NavLink>
      
      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
          Home
        </NavLink>
        <NavLink to="/cards" end className={({ isActive }) => isActive ? "active" : ""}>
          Cards
        </NavLink>
        <NavLink to="/cards/new" className={({ isActive }) => isActive ? "active" : ""}>
          Add Card
        </NavLink>

        {token ? (
          // Added className="logout-btn" here
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
}