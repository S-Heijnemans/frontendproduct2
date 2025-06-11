function toggleFavoriteChat(chatId) {
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (favorites.includes(chatId)) {
    favorites = favorites.filter(id => id !== chatId); // Verwijderen
  } else {
    favorites.push(chatId); // Toevoegen
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
}
