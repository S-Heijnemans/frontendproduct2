'use client'

import { useState } from "react";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function CreateData() {
    const [message, setMessage] = useState("");
    const AddChat = async (e)  => {
        e.preventDefault();
        const ChatDoc = collection(db, "Chats");
        await addDoc(ChatDoc,{messages: message});
        setMessage("");
    }

    return(
        <>
        <form onSubmit={AddChat}>
            <input onChange={(e) => setMessage(e.target.value)} type="text" value={message}/>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}