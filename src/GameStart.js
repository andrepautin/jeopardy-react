import {useState} from 'react';
import GameBoard from './GameBoard';

/** GameStart Component -> GameBoard
 *  State: 
 *    - showStart (whether or not to show start button)
 *    - startClicked (if start button was clicked)
 */
function GameStart() {
  const [showStart, setShowStart] = useState(true);
  const [startClicked, setStartClicked] = useState(false);
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
      {showStart && !startClicked && <button onClick={handleClick}>Start</button>}
      {/* {!showRestart && <button onClick={handleClick}>Start</button>} */}
      {/* {showRestart && <button onClick={handleRestart}>Restart</button>} */}
      {startClicked && !showStart && <GameBoard/>}
      {/* {restartClicked && <GameBoard/>} */}
    </div>
  );
}

export default GameStart;