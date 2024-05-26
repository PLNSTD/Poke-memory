import { useState } from 'react'
import './App.css'
import PokeList from './components/PokeList.jsx'

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBest] = useState(0);

  const handleScore = (shouldReset) => {
    if (shouldReset) handleReset();
    else {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > bestScore) setBest(newScore);
    }
  }

  const handleReset = () => {
    setScore(0);
  }

  return (
    <>
      <div id="header" className=''>
        <h1 id="game-title" className='poke-yellow'>PokéMemory by Pi</h1>
        <div id="scoreboard" className='grey-ground'>
          <h3 className='poke-yellow'>Score: {score}</h3>
          <h3 className='poke-yellow'>Best Score: {bestScore}</h3>
        </div>
      </div>
      <h4>Get points by clicking on a Pokemon, try to catch&apos;em all <span className='poke-yellow'>12</span> without clicking on the same you already clicked.</h4>
      {/* <button onClick={handleScore}>Add</button>
      <button onClick={handleReset}>Reset Score</button> */}
      <div id="card-field">
        <PokeList sendDataToParent={handleScore}/>
      </div>
    </>
  )
}

export default App
