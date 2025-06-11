// favorites.js

const chats = [
  { id: '1', name: 'Team Project' },
  { id: '2', name: 'Support Chat' },
];

function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function isFavorite(chatId) {
  return getFavorites().includes(chatId);
}

function toggleFavorite(chatId) {
  let favorites = getFavorites();
  if (favorites.includes(chatId)) {
    favorites = favorites.filter(id => id !== chatId);
  } else {
    favorites.push(chatId);
  }
  saveFavorites(favorites);
  renderFavorites();
}

export function renderFavorites() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    // Niet in de browser, dus sla over
    return;
  }

  // Browserlogica hier
  const container = document.getElementById('favoritesContainer');
  if (!container) return;

  container.innerHTML = '';

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites.forEach((favorite) => {
    const div = document.createElement('div');
    div.textContent = favorite.name || 'Naam onbekend';
    container.appendChild(div);
  });
}
