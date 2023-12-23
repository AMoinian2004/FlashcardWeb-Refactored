import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ConfigPage from './ConfigPage';
import './style.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
        setMessage('');
      } else {
        setMessage('Failed to login. Please check your credentials.');
      }
    } catch (error) {
      setMessage('An error occurred while logging in.');
    }
  };

  const handleSignup = async () => {
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage('Account created successfully. Please log in.');
        setIsSigningUp(false);
      } else {
        setMessage('Failed to create account.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  const renderLoginForm = () => (
    <div>
      <h2>Login</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Log In</button>
      <button onClick={() => setIsSigningUp(true)}>Sign Up</button>
      <p>{message}</p>
    </div>
  );

  const renderSignupForm = () => (
    <div>
      <h2>Sign Up</h2>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignup}>Create Account</button>
      <button onClick={() => setIsSigningUp(false)}>Back to Login</button>
      <p>{message}</p>
    </div>
  );

  return (
    <Router>
      {!isLoggedIn ? (isSigningUp ? renderSignupForm() : renderLoginForm()) : <ConfigPage />}
    </Router>
  );
}

export default App;
