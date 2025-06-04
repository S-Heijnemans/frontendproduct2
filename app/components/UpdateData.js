'use client'

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function UpdateData({ chatid }) {
    const [message, setMessage] = useState("");

    const UpdateMessage = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "Chats", chatid); 
            await updateDoc(docRef, { messages: message });
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    return (
        <form onSubmit={UpdateMessage}>
            <input 
                onChange={(e) => setMessage(e.target.value)} 
                type="text" 
                value={message} 
            />
            <button type="submit">Update</button>
        </form>
    );
}
