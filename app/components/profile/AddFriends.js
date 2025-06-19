'use client'

import { useState } from "react";
import { doc, updateDoc, arrayUnion, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function AddFriend() {
  const [friendEmail, setFriendEmail] = useState("");
  const [status, setStatus] = useState(null);

  const currentUser = auth.currentUser;
  if (!currentUser) {
    return <p>Je moet ingelogd zijn om vrienden toe te voegen.</p>;
  }

  const handleAddFriend = async (e) => {
    e.preventDefault();
    setStatus("Bezig met toevoegen...");

    try {
      const q = query(collection(db, "Users"), where("email", "==", friendEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setStatus("Gebruiker niet gevonden");
        return;
      }

      const friendDoc = querySnapshot.docs[0];
      const friendId = friendDoc.id;

      if (friendId === currentUser.uid) {
        setStatus("Je kunt jezelf niet toevoegen als vriend.");
        return;
      }

      const currentUserRef = doc(db, "Users", currentUser.uid);
      await updateDoc(currentUserRef, {
        friends: arrayUnion(friendId),
      });

      setStatus("Vriend succesvol toegevoegd!");
      setFriendEmail("");
    } catch (error) {
      setStatus("Fout bij toevoegen: " + error.message);
    }
  };

  return (
    <form onSubmit={handleAddFriend} className="flex flex-col gap-2">
      <input 
        type="email" 
        placeholder="Email van vriend" 
        value={friendEmail}
        onChange={(e) => setFriendEmail(e.target.value)}
        required 
        className="border p-2"
      />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">
        Voeg vriend toe
      </button>
      {status && <p>{status}</p>}
    </form>
  );
}
