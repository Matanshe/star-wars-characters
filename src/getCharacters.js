import axios from "axios";

function getCharacters() {

    const url = "https://swapi.dev/api/"

    let characters = [];
    // first page
    return axios(url + "people/")
        .then(response => {
            // collect people from first page
            characters = response.data.results;
            return response.data.count;
        })
        .then(count => {
            // exclude the first request
            const numberOfPagesLeft = Math.ceil((count - 1) / 10);
            let promises = [];
            // start at 2 as you already queried the first page
            for (let i = 2; i <= numberOfPagesLeft; i++) {
                promises.push(axios(url + `people?page=${i}`));
            }
            return Promise.all(promises);
        })
        .then(response => {
            //get the rest records - pages 2 through n.
            characters = response.reduce((acc, data) => [...acc, ...data.data.results], characters);
            return characters;
        })
        .then(characters => {
            characters = characters.map((character) => {
                let newCharacter = character;
                newCharacter.checked = false;
                return newCharacter
            })
            return characters;

        })
        .catch(error => console.log("cant get characters"));
}

export default getCharacters;