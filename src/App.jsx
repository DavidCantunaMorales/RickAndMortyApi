import imagenRickMorty from "./assets/img/cover-image.png";
import { useState, useEffect } from "react";
import "./App.css";
import Characters from "./components/Characters";
import axios from "axios"; // Importa Axios

function App() {
  const [character, setcharacter] = useState(null);
  const [pageNumber, setpageNumber] = useState(0);
  const [buscar, setBuscrar] = useState("");
  const [info, setinfo] = useState(null);
  const [species, setSpecies] = useState("");

  const Url =
    "https://rickandmortyapi.com/api/character/?page=" +
    pageNumber +
    "&name=" +
    buscar +
    "&species=" +
    species;

  useEffect(() => {
    if (pageNumber == 0) {
      return setcharacter(null);
    }
    axios
      .get(Url)
      .then((response) => {
        const data = response.data;
        if (data.error) {
          setcharacter(data.error);
        } else {
          setcharacter(data.results);
          setInfo(data.info);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [Url]);

  const reqApi = async () => {
    //realizando peticion a la api de rick and morty
    const api = await fetch(Url);
    const charactersApi = await api.json();
    setcharacter(charactersApi.results);
    setinfo(charactersApi.info);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Rick & Morty</h1>
        {character ? (
          <Characters
            info={info}
            setBuscrar={setBuscrar}
            pageNumber={pageNumber}
            setpageNumber={setpageNumber}
            characters={character}
            setCharacters={setcharacter}
          />
        ) : (
          <>
            <img
              src={imagenRickMorty}
              className="img-home"
              alt="Rick & Morty"
            />
            <br />
            <button onClick={reqApi} className="btn-search">
              Buscar
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
