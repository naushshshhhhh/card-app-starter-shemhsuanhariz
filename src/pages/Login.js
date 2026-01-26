import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setBusy(true);
        setError(""); // Clear previous errors

        try {
            // 1. Call login. (If api.js is set up correctly, 'data' is the JSON object)
            const data = await login({ username, password });
            
            // 2. Save token
            localStorage.setItem("token", data.token);
            
            // 3. Navigate
            navigate("/cards/new"); // Or navigate("/cards")
            
        } catch (e2) {
            console.error(e2);
            // --- FIX IS HERE ---
            // Use the actual error message from the backend, or fallback to "Login failed"
            setError(e2.message || "Login failed"); 
        } finally {
            setBusy(false);
        }
    }

    return (
        <main className="page form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="card-form">
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="demo"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="123" 
                        required
                    />
                </div>
                
                {error ? <p style={{ color: "crimson" }}>{error}</p> : null}
                
                <button disabled={busy} type="submit" className="button primary">
                    {busy ? "Logging in..." : "Login"}
                </button>
            </form>
        </main>
    );
}