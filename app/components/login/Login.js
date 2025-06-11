'use client'

import { useState } from "react";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const provider = new GoogleAuthProvider();

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in!");
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Inloggen mislukt. Controleer je gegevens.");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log("User logged in with Google!");
    } catch (err) {
      console.error("Google login error:", err.message);
      setError("Google login mislukt.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        <button type="submit">Login</button>
      </form>

      <button 
        type="button" 
        onClick={signInWithGoogle} 
        className="bg-blue-600 text-white rounded px-4 py-2"
      >
        Login met Google
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
