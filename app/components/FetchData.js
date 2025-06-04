'use client'

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import DeleteData from "./DeleteData";
import UpdateData from "./UpdateData";

export default function FetchData() {
    const [chatsList, setChatsList] = useState([]);
    const chatCollectionRef = collection(db, "Chats");

    useEffect(() => {
    const getChats = async () => {
        const data = await getDocs(chatCollectionRef);
        const mappedData = data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
        });
        setChatsList(mappedData);
    };
    getChats();
    }, []);

    return (
        <div>
            {chatsList.map((chat) =>
                <div key={chat.id} className="flex flex-row gap-4">
                    <li>{chat.messages}</li> 
                    <UpdateData chatid={chat.id} />
                    <DeleteData chatid={chat.id} />
                </div>
            )}
        </div>
    );
}