import {useState, useEffect} from 'react';
import GameBoard from './GameBoard';
function GameStart() {
  const [startClicked, setStartClicked] = useState(false);
  
  function handleClick() {
    setStartClicked(true);
  }

  return (
    <div>
      <button onClick={handleClick}>Start</button>
      {startClicked && <GameBoard/>}
    </div>
  );
}

export default GameStart;