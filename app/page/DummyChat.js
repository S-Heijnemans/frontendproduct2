// Maak knop aan
const openChatBtn = document.createElement('button');
openChatBtn.textContent = 'Open Chat';
document.body.appendChild(openChatBtn);

// Maak chat container
const dummyChat = document.createElement('div');
dummyChat.style.display = 'none';
dummyChat.style.border = '1px solid black';
dummyChat.style.padding = '10px';
dummyChat.style.width = '300px';
dummyChat.style.marginTop = '10px';

// Maak berichten container
const chatMessages = document.createElement('div');
chatMessages.style.height = '150px';
chatMessages.style.overflowY = 'auto';
chatMessages.style.border = '1px solid gray';
chatMessages.style.marginBottom = '10px';
chatMessages.style.padding = '5px';
chatMessages.style.fontFamily = 'sans-serif';
chatMessages.style.fontSize = '14px';

// Maak input veld
const chatInput = document.createElement('input');
chatInput.type = 'text';
chatInput.placeholder = 'Typ je bericht...';
chatInput.style.width = '70%';
chatInput.style.padding = '5px';

// Maak verzendknop
const sendBtn = document.createElement('button');
sendBtn.textContent = 'Verstuur';

// Voeg alles toe aan dummyChat container
dummyChat.appendChild(chatMessages);
dummyChat.appendChild(chatInput);
dummyChat.appendChild(sendBtn);

// Voeg dummyChat toe aan body
document.body.appendChild(dummyChat);

// Knop functionaliteit open/dicht
openChatBtn.addEventListener('click', () => {
  if (dummyChat.style.display === 'none' || dummyChat.style.display === '') {
    dummyChat.style.display = 'block';
    chatInput.focus();
  } else {
    dummyChat.style.display = 'none';
  }
});

// Bericht toevoegen functie
function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.textContent = `${sender}: ${text}`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Verzend knop handler
sendBtn.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, 'Jij');
  chatInput.value = '';

  setTimeout(() => {
    addMessage(`Dit is een dummy antwoord op "${text}"`, 'Bot');
  }, 500);
});

// Enter-to-send functionaliteit
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});
