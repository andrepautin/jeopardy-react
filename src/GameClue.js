import {useState} from 'react';
import "./GameClue.css";
/** GameClue component
 *  State:
 *    - timesClicked (state to keep track of how many times clue was clicked)
 *    - showing (handles what to show on clue)
 *  Props:
 *    - clue = {question, answer}
 */
function GameClue({ clue }) {
  const [timesClicked, setTimesClicked] = useState(1);
  const [showing, setShowing] = useState(clue.value);

  function handleClick() {
    setTimesClicked(timesClicked + 1);
    if (timesClicked === 1) {
      setShowing(clue.question);
    } else if (timesClicked === 2) {
      setShowing(clue.answer);
    }
  }

  return (
    <div className="clue" onClick={handleClick}>
      <p>{showing}</p>
    </div>
  )
}

export default GameClue;