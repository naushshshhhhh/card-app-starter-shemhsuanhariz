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
        setError(""); 

        try {
            const data = await login({ username, password });
            
            localStorage.setItem("token", data.token);
            
            navigate("/cards/new");
            
        } catch (e2) {
            console.error(e2);
            setError(e2.message || "Login failed"); 
        } finally {
            setBusy(false);
        }
    }

    return (
        <main className="page centered-container">
            
            <div className="form-container">
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
            </div>
        </main>
    );
}