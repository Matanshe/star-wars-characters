import React, {useContext, useEffect, useState} from "react";
import CharactersContext from "../CharactersContext";
import {forEach} from "react-bootstrap/ElementChildren";
import {Card, Container, Spinner} from "react-bootstrap";

function Films(){

    const characters = useContext(CharactersContext).characters;
    const likedCharacters = characters.filter(character => character.checked === true)
    const [films, setFilms] = useState([]);
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        fetch("https://swapi.dev/api/films")
            .then(response => response.json())
            .then(data => {
                let filmsData = data.results.map(film => {
                    film.numOfLikedCharacters = 0;
                    return film;
                })
                let numOfLikedCharacters = countLikedCharacters(likedCharacters, data.results)
                filmsData.forEach((film,index) => {
                    film.numOfLikedCharacters = numOfLikedCharacters[index]
                })
                filmsData.sort((a,b) => sortFilm(a,b))
                setFilms(filmsData)
                setLoading(false)
            })
        },[])

    if(!loading)
        return(
            <div>
                <FilmList films={films} />
            </div>
        )
    else
        return <Spinner animation="border" variant="warning" size="lg"/>
}


function countLikedCharacters(characters, films){
    let likes = new Array(films.length).fill(0);

    characters.forEach(character => character.films.forEach(film =>{
        let index = films.findIndex(i => i.url === film);
        likes[index] = likes[index]+1
    }))
    return likes;
}

function sortFilm(film1,film2) {
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

function FilmList(props){


    const filmList = props.films.map(film => <Card style={{ width: '18rem' }} key={film.episode_id} >
            <Card.Title>{film.title}</Card.Title>
            <Card.Body>number of liked characters: {film.numOfLikedCharacters} release date:{film.release_date}</Card.Body>
        </Card>
    )
    return <Container style={{flexDirection:"column",paddingLeft:"25%"}} className="container">
        {filmList}
    </Container>

}


export default Films;