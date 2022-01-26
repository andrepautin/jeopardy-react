import axios from "axios";
import _ from "lodash";
import React from "react";
import ReactDOM from "react";
import {v4 as uuidv4} from "uuid";
import {useState, useEffect} from 'react';
import GameClue from "./GameClue";
const BASE_API_URL = "http://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

/** GameBoard Component -> GameClue */
function GameBoard(props) {
  // TODO: implement api call for clues 
  // to get more info (value to show instead of "?")

  const [randomCategories, setRandomCategories] = useState([]);
  const [categoryClues, setCategoryClues] = useState([]);
  const [clueRows, setClueRows] = useState([]);
  // makes api call to jservice and retrieves 6 random categories
  // TODO: error handling (in case of server error or other)

  // function resetGame() {
  //   setRandomCategories([]);
  //   setCategoryClues([]);
  //   setClueRows([]);
  // }

  useEffect(
    function getCategories() {
      async function getCategoriesSample() {
        const response = await axios({
          url: `${BASE_API_URL}/categories`,
          method: "GET",
          params: {count: 100, offset: Math.floor(Math.random() * 1000)}
        });
        let sample = _.sampleSize(response.data, NUM_CATEGORIES);
        setRandomCategories(sample);
      }
      getCategoriesSample();
    }, []
  )

  useEffect(
    function getCat() {
      async function getCategory() {
        for (let randomCat of randomCategories) {
          let response = await axios({
            url: `${BASE_API_URL}/category`,
            method: "GET",
            params: {id: randomCat.id}
          });
          let category = response.data;
          let catClues = category.clues.map(clue => {
            clue = {
              question: clue.question, 
              answer: clue.answer, 
              showing: null
            };
            return clue;
          })
          setCategoryClues(categoryClues => 
            [...categoryClues, {title: category.title, catClues: catClues}]
          );
        }
      }
      getCategory();
    }, [randomCategories]
  )

  /** after categoryClues complete
   *  should iterate over category clues
   *  retrieve one clue from each category and
   *  put into array of arrays that will create a 
   *  new row in the table
   */
  useEffect(
    function getClues() {
      if (categoryClues.length === NUM_CATEGORIES) {
        for (let i = 0; i < NUM_CLUES_PER_CAT; i++) {
          let row = [];
          for (let j = 0; j < NUM_CATEGORIES; j++) {
            let category = categoryClues[j].catClues;
            row.push(category[i]);
          }
          setClueRows(clueRows => [...clueRows, row]);
        }
      }
    }, [categoryClues]
  )

  return (
    <div>
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