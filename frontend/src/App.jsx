import { useState } from 'react';
import './App.css';
const API_URL = "http://localhost:8000/api/v1/users";

function App() {
  // State for forms
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");

  const [message, setMessage] = useState("");
  const[name,setName]=useState("");

  // 1. SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name,email, password, role }),
      });
      const data = await res.text();
      setMessage("Signup successfully");
    } 
    catch (err) {
      setMessage("Signup failed");
    }
  };

  // 2. LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", //It's needed to save the refresh cookie!
      });
      
      if (!res.ok) {
        const errText = await res.text();
        setMessage(errText);
        return;
      }

      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      setToken(data.accessToken);
      setMessage("Login successful!");
    } catch (err) {
      setMessage("Login failed");
    }
  };

  // protected routes like fetch the user or admin features
  const fetchProtectedRoute = async (routePath) => {
  try {
    let res = await fetch(`${API_URL}${routePath}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    //  If token expired
    if (res.status === 403 || res.status === 401) {
      const refreshRes = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        credentials: "include",
      });

      const refreshData = await refreshRes.json();

      if (!refreshData.accessToken) {
        setMessage("Session expired. Please login again.");
        return;
      }

      //  update token
      localStorage.setItem("accessToken", refreshData.accessToken);
      setToken(refreshData.accessToken);

       console.log("OLD TOKEN:", token);
    console.log("NEW TOKEN:", refreshData.accessToken);

      //  retry request with new token
      res = await fetch(`${API_URL}${routePath}`, {
        headers: {
          Authorization: `Bearer ${refreshData.accessToken}`,
        },
      });
    }

    const data = await res.text();
    setMessage(data);
  }
  catch (err) {
    setMessage("Error fetching data");
  }
};

  // 5. LOGOUT
  const handleLogout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include", // Clear the cookie
    });
    localStorage.removeItem("accessToken");
    setToken("");
    setMessage("Logged out");
  };

  return (
    <div className='mian-Container'>
      <h2>Welcome</h2>

      {/* Forms */}
      {!token ? (
        <div className='signup-login-container'>
          <h3>Sign up / Log in</h3>
          <input placeholder="Enter Name" value={name} 
            onChange={(e) => setName(e.target.value)} />
          <br/><br/>
          
          <input placeholder="Email" value={email} 
            onChange={(e) => setEmail(e.target.value)} />
          <br/><br/>
          
          <input type="password" placeholder="Password" value={password} 
            onChange={(e) => setPassword(e.target.value)} /><br/><br/>
          
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
         <br/>
          <div className='signup-login-btns'>
            <button onClick={handleSignup}>Sign Up</button>
            <button onClick={handleLogin}>Log In</button>
          </div>
        </div>
      ) : (
        <div className='dashboard'>
          <h3>Dashboard</h3>
          <button onClick={() => fetchProtectedRoute("/profile")}>View Profile (Any User)</button>
          <button onClick={() => fetchProtectedRoute("/admin")}>View Admin (Admin Only)</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}

      {/* Message Display */}
      <div className='message-display'>
        <strong>Server Response:</strong>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;