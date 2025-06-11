'use client';

import { useEffect } from "react";
import FetchData from "@/app/components/FetchData";
import CreateData from "./components/CreateData";
import { renderFavorites } from "./components/favorite/Favorites";

export default function Home() {
  useEffect(() => {
    renderFavorites();
  }, []);

  return (
    <>
      <FetchData />
      <CreateData />
      
      <div id="favoritesContainer" /> {/* Hier komt je output */}

      <button id="openChatBtn" onClick={() => {
        const chatEl = document.getElementById('dummyChat');
        if (chatEl) {
          chatEl.style.display = chatEl.style.display === 'none' ? 'block' : 'none';
        }
      }}>
        Open Chat
      </button>

      <div id="dummyChat" style={{ display: 'none', border: '1px solid black', padding: '10px', width: '300px', marginTop: '10px' }}>
        <div id="chatMessages" style={{ height: '150px', overflowY: 'auto', border: '1px solid gray', marginBottom: '10px', padding: '5px' }}>
          {/* Hier komen berichten */}
        </div>
        <input type="text" id="chatInput" placeholder="Typ je bericht..." style={{ width: '80%' }} />
        <button onClick={() => {
          const input = document.getElementById('chatInput');
          const messages = document.getElementById('chatMessages');
          if (input.value.trim() === '') return;

          // Bericht toevoegen aan chat
          const userMsg = document.createElement('div');
          userMsg.textContent = `Jij: ${input.value}`;
          messages.appendChild(userMsg);

          // Dummy antwoord
          const botMsg = document.createElement('div');
          botMsg.textContent = `Bot: Dit is een dummy antwoord op "${input.value}"`;
          messages.appendChild(botMsg);

          messages.scrollTop = messages.scrollHeight; // Scroll naar beneden
          input.value = '';
          input.focus();
        }}>
          Verstuur
        </button>
      </div>
    </>
  );
}

