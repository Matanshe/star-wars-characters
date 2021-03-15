export function countLikedCharacters(characters, films) {
    let likes = new Array(films.length).fill(0);

    characters.forEach(character => character.films.forEach(film => {
        let index = films.findIndex(i => i.url === film);
        likes[index] = likes[index] + 1
    }))
    return likes;
}

export function sortFilm(film1, film2) {
    if (film1.numOfLikedCharacters < film2.numOfLikedCharacters) {
        return 1;
    } else if (film1.numOfLikedCharacters > film2.numOfLikedCharacters) {
        return -1;
    }
    // Else go to the 2nd item
    else if (film1.release_date < film2.release_date) {
        return -1;
    } else if (film1.release_date > film2.release_date) {
        return 1
    } else { // nothing to split them
        return 0;
    }
}