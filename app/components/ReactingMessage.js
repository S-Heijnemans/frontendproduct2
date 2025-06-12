'use client'

import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function ReactingMessage({ parentId = null }) {
  const [message, setMessage] = useState("");

  const ReactChat = async (e)  => {
    e.preventDefault();
    const ChatDoc = collection(db, "Chats");
    await addDoc(ChatDoc, {
      messages: message,   
      parentId: parentId || null,
    });
    setMessage("");
}

  return (
    <form onSubmit={ReactChat} className="flex gap-2">
      <input
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        value={message}
        placeholder={parentId ? "Type your reaction..." : "Type your message..."}
      />
      <button type="submit">
        Submit
      </button>
    </form>
  );
}
