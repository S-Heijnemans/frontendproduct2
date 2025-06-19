'use client'

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AddFriend from "./AddFriends";

export default function ProfileShow() {
  const [displayName, setDisplayName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setDisplayName(data.displayName || "");
          setIsPrivate(data.isPrivate || false);
        } else {
          setError("Profiel bestaat niet");
        }
      } catch (err) {
        setError("Fout bij laden profielgegevens");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      const docRef = doc(db, "Users", user.uid);
      await updateDoc(docRef, { displayName, isPrivate });
      alert("Profiel bijgewerkt!");
    } catch (err) {
      alert("Fout bij opslaan profiel: " + err.message);
    }
  };

  if (loading) return <p>Bezig met laden...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Je moet ingelogd zijn om je profiel te bekijken.</p>;

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl mb-4">Mijn Profiel</h2>
      
      <label className="block mb-2">Naam:</label>
      <input 
        type="text" 
        value={displayName} 
        onChange={(e) => setDisplayName(e.target.value)} 
        className="border p-2 mb-4 w-full"
      />

      <label className="block mb-4">
        <input
          type="checkbox"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
          className="mr-2"
        />
        Privé profiel (alleen zichtbaar voor vrienden)
      </label>

      <button 
        onClick={handleSave} 
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Opslaan
      </button>

      <AddFriend />
    </div>
  );
}
