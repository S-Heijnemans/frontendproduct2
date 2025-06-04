'use client'

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, updateDoc } from "firebase/firestore";

export default function UpdateData() {
    const [message, setMessage] = useState("");

    const UpdateMessage = async (e) => {
        e.preventDefault();
        const Update = collection(db, "Chats");
        await updateDoc(Update, {messages: message});
        setMessage(message);
    }

    return(
        <>
        <form onSubmit={UpdateMessage}>
            <input onChange={(e) => setMessage(e.target.value)} type="text" value={message}/>
            <button type="submit">Update</button>
        </form>
        </>
    )
}