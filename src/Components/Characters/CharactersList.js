import React, {useContext, useReducer} from 'react';
import {Card, Container, ToggleButton} from "react-bootstrap";
import '../../App.css';
import CharactersContext from "../../CharactersContext";


function setCheckedCharacters(characters, changeCharacters, props, forceUpdate) {
    const setChecked = function (checked, index) {
        // get all the characters from the context and set them as function state
        let tmpCharacters = characters;
        tmpCharacters[index].checked = checked;
        changeCharacters(tmpCharacters)

        // get the filtered characters and set them as state
        let tmpFiltered = props.charactersList;
        tmpFiltered[index].checked = checked;
        props.setCharactersList(tmpFiltered);

        localStorage.removeItem("characters")
        localStorage.setItem("characters", JSON.stringify(tmpCharacters))

        // i know that this is a bad practice but i couldn't figure why the component sometimes doesn't rerender
        forceUpdate();
    }
    return setChecked;
}

function CharactersList(props) {

    const characters = useContext(CharactersContext).characters;
    const changeCharacters = useContext(CharactersContext).changeCharacters;

    // i know thats not the best idea, but i spent too much time on figuring out why this is not rerendering
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const setChecked = setCheckedCharacters(characters, changeCharacters, props, forceUpdate);

    return (
        <Container className="container">
            {props.charactersList.map((data, index) => {
                if (data) {
                    return (
                        <Card key={index} style={{width: '18rem'}}>
                            <Card.Body>
                                <Card.Title>{data.name} </Card.Title>
                                <ToggleButton
                                    type="checkbox"
                                    variant="secondary"
                                    checked={data.checked}
                                    onChange={(e) => {
                                        setChecked(e.currentTarget.checked, index)
                                    }}
                                />
                            </Card.Body>
                        </Card>
                    )
                }
                return null
            })}
        </Container>
    );
}

export default CharactersList
