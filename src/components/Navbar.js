import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <strong className="brand">Card App</strong>
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
      </nav>
    </header>
  );
}