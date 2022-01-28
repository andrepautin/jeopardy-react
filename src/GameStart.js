import {useState} from 'react';
import GameBoard from './GameBoard';
import "./GameStart.css";

/** GameStart Component -> GameBoard
 *  State: 
 *    - showStart (whether or not to show start button)
 *    - startClicked (if start button was clicked)
 *  
 *  Props:
 *    - reset() -> function to call when restart button clicked
 */
function GameStart(props) {

  const [showStart, setShowStart] = useState(true);
  const [startClicked, setStartClicked] = useState(false);
  
  function handleClick() {
    setStartClicked(true);
    setShowStart(false);
  }

  /** Calls resetGame function in parent component */
  function handleReset() {
    props.reset();
  }

  return (
    <div className="load-game">
      {showStart && !startClicked && <button onClick={handleClick}>Start</button>}
      {startClicked && <button onClick={handleReset}>Restart</button>}
      {startClicked && !showStart && <GameBoard clues={props.clues} categories={props.categories}/>}
    </div>
  );
}

export default GameStart;