import { useEffect, useState } from "react";

/* Get pokemon images from url API 'https://pokeapi.co/api/v2/pokemon/pikachu'  */
// From returned JSON get in answer.sprites.other.official-artwork.front_default it returns a PNG file
// Or get it in answer.sprites.other.dream_world.front_default it return an SVG file
const pokeIdList = [1,4,7,12,17,25,34,64,104,130,143,149];

async function infoAPI(pokeIdList, setCards, setFetching) {
    const cardsList = [];
    const promises = pokeIdList.map(async (pokeId) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`);
        const data = await response.json();
        const pokemon = {
            name:data.name,
            sprite: data.sprites.other['official-artwork'].front_default
        };
        
        setCards([...cardsList, pokemon]);
        cardsList.push(pokemon);
        setFetching(false);

        return pokemon;
    });

    await Promise.all(promises);
    console.log('All promises completed')
}

export default function PokeList ({sendDataToParent}) {
    const [cardsList, setCards] = useState([{name: 'pokeTest', sprite: 'none'}]);
    const [isFetching, setFetching] = useState(true);
    const [previousCard, setPreviousCard] = useState(false);

    useEffect(() => {
        infoAPI(pokeIdList, setCards, setFetching);
    }, []);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1)); // Generate random index between 0 and i
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
        }
        return array;
    }

    const handleScoreClick = (pokemon) => {
        if (!previousCard) {
            setPreviousCard([pokemon]);
            sendDataToParent(false);
        }
        else if (!previousCard.includes(pokemon)) {
            setPreviousCard([...previousCard, pokemon]);
            sendDataToParent(false);
        }
        else {
            setPreviousCard(false);
            sendDataToParent(true);
        }

        //SHUFFLE AND YOUR DONEEEEEEEEEEEEEE
        shuffleArray(cardsList);
    }

    return (
        <>
            { isFetching ? ( 
                <p>Loading</p>
            ) : cardsList.map(pokemon => (
                <div key={pokemon.name} className="pokemon-card" onClick={() => {handleScoreClick(pokemon)}}>
                    <img  src={pokemon.sprite} alt={pokemon.name}/>
                    <p>{pokemon.name}</p>
                </div>
            ))}
        </>
    );
}