import {useState, useEffect} from 'react';

function GameClue({ clue }) {
  const [clueClicked, setClueClicked] = useState(false);
  const [questionClicked, setQuestionClicked] = useState(false);

  return (
    <div>
      {!clueClicked && !questionClicked && <p>?</p>}
    </div>
  )
}

export default GameClue;