import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  
  // 1. Retrieve the token from local storage
  const token = localStorage.getItem("token");

  // 2. Define the logout function
  function handleLogout() {
    localStorage.removeItem("token"); // Remove the token
    navigate("/login"); // Redirect to login page
    // Optional: Reload to update UI if state isn't global
    // window.location.reload(); 
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