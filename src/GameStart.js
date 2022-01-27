import {useState} from 'react';
import GameBoard from './GameBoard';

/** GameStart Component -> GameBoard
 *  State: 
 *    - showStart (whether or not to show start button)
 *    - startClicked (if start button was clicked)
 */
function GameStart(props) {
  // TODO: need to get restart to clear 
  // state in GameBoard so new api calls can be made
  const [showStart, setShowStart] = useState(true);
  const [startClicked, setStartClicked] = useState(false);
  // const [restartClicked, setRestartClicked] = useState(false);
  
  function handleClick() {
    setStartClicked(true);
    setShowStart(false);
  }

  function handleReset() {
    props.reset();
  }

  return (
    <div>
      {showStart && !startClicked && <button onClick={handleClick}>Start</button>}
      {startClicked && <button onClick={handleReset}>Restart</button>}
      {startClicked && !showStart && <GameBoard clues={props.clues} categories={props.categories}/>}
    </div>
  );
}

export default GameStart;