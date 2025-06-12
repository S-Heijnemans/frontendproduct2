'use client'

import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ReactingMessage from "./ReactingMessage";
import UpdateData from "./UpdateData";
import DeleteData from "./DeleteData";

function ChatWithReactions({ chat }) {
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    const fetchReactions = async () => {
      const reactionsQuery = query(
        collection(db, "Chats"),
        where("parentId", "==", chat.id)
      );
      const querySnapshot = await getDocs(reactionsQuery);
      setReactions(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchReactions();
  }, [chat.id]);

  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center gap-4">
        <strong>{chat.messages}</strong> 
        <UpdateData chatid={chat.id} />
        <DeleteData chatid={chat.id} />
      </div>

      <ReactingMessage parentId={chat.id} />

      <div className="ml-6 mt-2 border-l-2 border-gray-300 pl-4">
        {reactions.length === 0 && <small>Geen reacties</small>}
        {reactions.map(r => (
          <div key={r.id} className="mb-1">
            <span>↳ {r.messages}</span>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function FetchData() {
  const [chatsList, setChatsList] = useState([]);
  const chatCollectionRef = collection(db, "Chats");

  useEffect(() => {
    const getChats = async () => {
      const data = await getDocs(chatCollectionRef);
      const mainMessages = data.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(chat => !chat.parentId); 
      setChatsList(mainMessages);
    };
    getChats();
  }, []);

  return (
  <div>
    {chatsList.map(chat => (
      <ChatWithReactions key={chat.id} chat={chat} />
    ))}
  </div>
);
}
