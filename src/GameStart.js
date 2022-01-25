import {useState, useEffect} from 'react';
import GameBoard from './GameBoard';
function GameStart() {
  const [startClicked, setStartClicked] = useState(false);
  const [showStart, setShowStart] = useState(true);
  // const [showRestart, setShowRestart] = useState(false);
  // const [restartClicked, setRestartClicked] = useState(false);
  
  function handleClick() {
    setStartClicked(true);
    setShowStart(false);
    // setShowRestart(true);
  }

  // function handleRestart() {
  //   setRestartClicked(true);
  // }

  return (
    <div>
      {showStart && <button onClick={handleClick}>Start</button>}
      {/* {!showRestart && <button onClick={handleClick}>Start</button>} */}
      {/* {showRestart && <button onClick={handleRestart}>Restart</button>} */}
      {startClicked && <GameBoard/>}
      {/* {restartClicked && <GameBoard/>} */}
    </div>
  );
}

export default GameStart;