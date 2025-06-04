'use client'

import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function DeleteData({ chatid }) {   

    const deleteChat = async (e) => {
        e.preventDefault();
         if (typeof chatid !== 'string' || chatid.trim() === '') {
        console.error("Invalid ID:", chatid);
        return;  
    }
     try {
        const chatDoc = doc(db, "Chats", chatid);
        await deleteDoc(chatDoc);
    } catch (error) {}
    }

    return (
        <>
            <button onClick={deleteChat}>Delete</button>
        </>
    );
}