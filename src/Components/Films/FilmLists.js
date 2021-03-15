import {Card, Container} from "react-bootstrap";
import React from "react";

export function FilmList(props) {


    const filmList = props.films.map(film => <Card style={{width: '18rem'}} key={film.episode_id}>
            <Card.Title>{film.title}</Card.Title>
            <Card.Body>number of liked characters: {film.numOfLikedCharacters} release date:{film.release_date}</Card.Body>
        </Card>
    )
    return <Container style={{flexDirection: "column", paddingLeft: "25%"}} className="container">
        {filmList}
    </Container>

}