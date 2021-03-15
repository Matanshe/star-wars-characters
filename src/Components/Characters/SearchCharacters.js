import React, {useContext, useState} from "react";
import CharactersContext from "../../CharactersContext";
import CharactersList from "./CharactersList";
import {Button} from "react-bootstrap";
import {useHistory} from "react-router-dom";


function SearchCharacters() {

    const [input, setInput] = useState('');
    const characters = useContext(CharactersContext).characters;
    const [charactersList, setCharactersList] = useState(characters);

    const history = useHistory();

    const updateInput = async (input) => {
        const filtered = characters.filter(character => {
            return character.name.toLowerCase().includes(input.toLowerCase())
        })
        setInput(input);
        setCharactersList(filtered);
    }

    if (characters)
        return <div>
            <div className="search-row">
                <SearchBar
                    input={input}
                    onChange={updateInput}
                />
                <Button onClick={() => history.push("/movies")}> check movies</Button>
            </div>
            <CharactersList charactersList={charactersList} setCharactersList={setCharactersList}/>
        </div>
}

const SearchBar = (props) => {
    const BarStyling = {width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem"};
    return (
        <input
            style={BarStyling}
            value={props.input}
            placeholder={"search character"}
            onChange={(e) => props.onChange(e.target.value)}
        />

    );
}


export default SearchCharacters;