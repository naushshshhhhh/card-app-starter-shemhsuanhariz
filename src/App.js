import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CardList from "./pages/CardList";
import AddCard from "./pages/AddCard";
import EditCard from "./pages/EditCard";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Route 1: Home page with instructions */}
        <Route path="/" element={<Home />} />

        {/* Route 2: Display all cards */}
        <Route path="/cards" element={<CardList />} />

        {/* Route 3: Add a new card */}
        <Route path="/cards/new" element={<AddCard />} />

        {/* Route 4: Edit an existing card (uses ID) */}
        <Route path="/cards/:id/edit" element={<EditCard />} />

        {/* Redirect any unknown URL back to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}