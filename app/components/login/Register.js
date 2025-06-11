'use client'

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "Users", user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: serverTimestamp()
            });

            console.log("Gebruiker geregistreerd!");
        } catch (err) {
            console.error("Registratiefout:", err.message);
            setError("Registratie mislukt: " + err.message);
        }
    };

    return (
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
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
            <button type="submit">Register</button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
}
