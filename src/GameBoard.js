import React from "react";
import {v4 as uuidv4} from "uuid";
import GameClue from "./GameClue";
import "./GameBoard.css";
/** GameBoard Component -> GameClue 
 * 
 *  Props:
 *    - categories = [{title, clues}]
 *    - clues = [{question, answer}, {question, answer}...]
*/

function GameBoard(props) {

  let categories = props.categories;
  let clues = props.clues;

  return (
    <div className="board">
      <div>
        {categories.length !== 6 && 
        <div className="loading">Loading Game...</div>}
        <table>
          <thead>
            {categories.length === 6 && <tr>
              {categories.map(cat => 
              <td className="cat-title" key={cat.title}>{cat.title}</td>)}
            </tr>}
          </thead>
          <tbody>
            {clues.map(
              clueRow => 
                <tr key={uuidv4()}>{clueRow.map(
                  clue => 
                    <td key={uuidv4()}><GameClue clue={clue}/></td>)}
                </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GameBoard;