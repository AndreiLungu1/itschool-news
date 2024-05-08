// Actiunea de add to favorites
export function addToFavorite(news) {
    return {
    type: 'ADD_TO_FAVORITES',
    payload: news,
    }
}
// Actiunea de remove from favorites 
export function removeFromFavorites(news) {
    return {
        type: 'REMOVE_FROM_FAVORITES',
        payload: news,
    }
}