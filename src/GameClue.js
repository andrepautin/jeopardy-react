import {useState} from 'react';
import "./GameClue.css";
/** GameClue component
 *  State:
 *    - clueClicked (whether a clue has been clicked or not)
 *    - questionClicked (whether a question has been clicked or not)
 *  Props:
 *    - clue = {question, answer, showing}
 */
function GameClue({ clue }) {
  const [clueClicked, setClueClicked] = useState(false);
  const [questionClicked, setQuestionClicked] = useState(false);

  function handleClueClick() {
    setClueClicked(true);
  }

  function handleQuestionClick() {
    setQuestionClicked(true);
  }

  return (
    <div className="clue">
      {!clueClicked && 
      !questionClicked && 
      <p onClick={handleClueClick}>?</p>
      }
      {clueClicked && 
      !questionClicked && 
      <p onClick={handleQuestionClick}>{clue.question}</p>
      }
      {questionClicked && <p>{clue.answer}</p>}
    </div>
  )
}

export default GameClue;