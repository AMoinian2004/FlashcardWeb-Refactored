import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ConfigPage from './ConfigPage';
import './styles/loginStyles.css';


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
        localStorage.setItem('username', username);
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
      <div className="header">
        <h1>Flashcard Web</h1>
      </div>
        <div className="form-container">
            <h2>Login</h2>
            <input className="input-field" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
            <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button className="form-button" onClick={handleLogin}>Log In</button>
            <button className="form-button secondary" onClick={() => setIsSigningUp(true)}>Sign Up</button>
            <p>{message}</p>
        </div>
    </div>
  );
  

  const renderSignupForm = () => (
    <div>
      <div className="header">
        <h1>Flashcard Web</h1>
      </div>
    <div className="form-container">
      <h2>Sign Up</h2>
      <input className="input-field" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button className="form-button" onClick={handleSignup}>Create Account</button>
      <button className="form-button secondary" onClick={() => setIsSigningUp(false)}>Back to Login</button>
      <p>{message}</p>
    </div>
    </div>
  );
  

  return (
    <Router>
      {!isLoggedIn ? (isSigningUp ? renderSignupForm() : renderLoginForm()) : <ConfigPage />}
    </Router>
  );
}

export default App;
