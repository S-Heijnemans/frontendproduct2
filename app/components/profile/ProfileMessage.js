'use client'

import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ShowProfileMessage from "./ShowProfileMessage";

export default function ProfileMessage({ userid }) {
  const [profMessage, setProfMessage] = useState("");
  const [status, setStatus] = useState(null);

  const AddProfileMessage = async (e) => {
    e.preventDefault();
    setStatus(null);
    if (!profMessage.trim()) return;

    try {
      const userRef = doc(db, "Users", userid);
      await updateDoc(userRef, {
        profileMessages: arrayUnion(profMessage),
      });
      setProfMessage("");
      setStatus("Bericht toegevoegd!");
    } catch (err) {
      console.error("Fout bij toevoegen profielbericht:", err);
      setStatus("Fout bij toevoegen.");
    }
  };

  return (
    <>
      <form onSubmit={AddProfileMessage} className="mt-4">
        <input
          type="text"
          value={profMessage}
          onChange={(e) => setProfMessage(e.target.value)}
          placeholder="Schrijf een profielbericht..."
          className="border px-2 py-1 mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          Submit
        </button>
      </form>

      <h1 className="mt-6 font-bold text-lg">Mijn berichten</h1>
      <ShowProfileMessage userid={userid} />
    </>
  );
}
