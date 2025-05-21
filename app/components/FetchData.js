'use client'

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function FetchData() {
    const [chatsList, setChatsList] = useState([]);
    const chatCollectionRef = collection(db, "chats");

    useEffect(() => {
    const getChats = async () => {
        const data = await getDocs(chatCollectionRef);
        console.log("Fetched documents:", data.docs);
        const mappedData = data.docs.map((doc) => {
            console.log("Document data:", doc.data());
            return { ...doc.data(), id: doc.id };
        });
        setChatsList(mappedData);
    };
    getChats();
}, []);

    return (
        <div>
            {chatsList.map((chat) =>
                <li key={chat.id}>{chat.messages}</li>
            )}
        </div>
    );
}