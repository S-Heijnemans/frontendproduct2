'use client'

import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function LikeMessage({ chatid, currentLikes = 0 }) {
  const handleAddLike = async () => {
    const messageRef = doc(db, "Chats", chatid);
    await updateDoc(messageRef, {
      likes: increment(1),
    });
  };

  return (
    <button onClick={handleAddLike} className="text-blue-500">
        Like ({currentLikes})
    </button>
  );
}
