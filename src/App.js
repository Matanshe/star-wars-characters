import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Components/Home";
import Films from "./Components/Films";
import {Spinner} from "react-bootstrap";
import getCharacters from "./getCharacters";
import {CharactersProvider} from "./CharactersContext";
import Header from "./Components/Header";


function App() {

    // get the initial liked characters from the local storage, if they exist
    const charactersFormLocal = localStorage.getItem("characters");
    const [loading, setLoading] = useState(true)
    const [characters, setCharacters] = useState(JSON.parse(charactersFormLocal));
    const getCharactersPromise = getCharacters();

    useEffect(() => {
        if (!charactersFormLocal)
            getCharactersPromise
                .then(value => setCharacters(value))
                .then(() => setLoading(false))
                .catch(() => console.log("cant get characters"))
        else setLoading(false)
    }, [])

    const providerOptions = {
        characters: characters,
        changeCharacters: (value) => setCharacters(value),
    }

    if (!loading) {
        return (
            <div className="App">
                <CharactersProvider value={providerOptions}>
                    <Router>
                        <Header/>
                        <Switch>
                            <Route exact path="/">
                                <Home/>
                            </Route>
                            <Route exact path="/movies">
                                <Films/>
                            </Route>
                        </Switch>
                    </Router>
                </CharactersProvider>
            </div>
        );
    } else
        return <div className="App">
            <Spinner animation="border" variant="warning" size="lg"/>
        </div>


}

export default App;
