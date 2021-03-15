import React, {useContext, useEffect, useState} from "react";
import CharactersContext from "../../CharactersContext";
import {Spinner} from "react-bootstrap";
import {FilmList} from "./FilmLists";
import {countLikedCharacters, sortFilm} from "./filmUtils";

function Films() {

    const characters = useContext(CharactersContext).characters;
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const likedCharacters = characters.filter(character => character.checked === true)

        fetch("https://swapi.dev/api/films")
            .then(response => response.json())
            .then(data => {
                // add the numOfLikedCharacters property
                let filmsData = data.results.map(film => {
                    film.numOfLikedCharacters = 0;
                    return film;
                })

                //check how many liked characters are in each movie
                let numOfLikedCharacters = countLikedCharacters(likedCharacters, data.results)


                filmsData.forEach((film, index) => {
                    film.numOfLikedCharacters = numOfLikedCharacters[index]
                })

                filmsData.sort((a, b) => sortFilm(a, b))
                setFilms(filmsData)
                setLoading(false)
            })
    }, [])

    if (!loading)
        return (
            <div>
                <FilmList films={films}/>
            </div>
        )
    else
        return <Spinner animation="border" variant="warning" size="lg"/>
}


export default Films;