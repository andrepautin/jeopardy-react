import React from "react";
import {v4 as uuidv4} from "uuid";
import GameClue from "./GameClue";

/** GameBoard Component -> GameClue */

function GameBoard(props) {
  return (
    <div>
      <div>
        {props.categories.length !== 6 && <div>Loading Game...</div>}
        <table>
          <thead>
            {props.categories.length === 6 && <tr>
              {props.categories.map(cat => <td key={cat.title}>{cat.title}</td>)}
            </tr>}
          </thead>
          <tbody>
            {props.clues.map(
              clueRow => 
                <tr key={uuidv4()}>{clueRow.map(
                  clue => 
                    <td key={uuidv4()}><GameClue clue={clue}/></td>)}
                </tr>)}
          </tbody>
        </table>
      </div>
      {/* {props.data === true 
        ? resetGame() 
        : 
        <div>
        {categoryClues.length !== 6 && <div>Loading Game...</div>}
        <table>
          <thead>
            {categoryClues.length === 6 && <tr>
              {categoryClues.map(cat => <td key={cat.title}>{cat.title}</td>)}
            </tr>}
          </thead>
          <tbody>
            {clueRows.map(
              clueRow => 
                <tr key={uuidv4()}>{clueRow.map(
                  clue => 
                    <td key={uuidv4()}><GameClue clue={clue}/></td>)}
                </tr>)}
          </tbody>
        </table>
      </div>} */}
    </div>
  );
}

export default GameBoard;