'use client'

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ShowProfileMessage({ userid, refreshTrigger }) {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const userRef = doc(db, "Users", userid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setMessages(data.profileMessages || []);
      }
    } catch (err) {
      console.error("Fout bij ophalen profielberichten:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [refreshTrigger]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Profielberichten:</h2>
      {messages.length > 0 ? (
        <ul className="list-disc list-inside space-y-1">
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      ) : (
        <p>Geen berichten gevonden.</p>
      )}
    </div>
  );
}
