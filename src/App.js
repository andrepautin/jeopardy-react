import './App.css';
import GameStart from './GameStart';
import GameHeader from './GameHeader';
import axios from "axios";
import _ from "lodash";
import React from "react";
import {useState, useEffect} from 'react';
const BASE_API_URL = "https://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

/** App Component -> GameHeader
 *                -> GameStart
 * 
 *  State:
 *    - randomCategories = [{id, title, clues_count}, {id, title, clues_count}...]
 *    - categoryClues = [{title, catClues: [{question, answer, value}]}...]
 *    - clueRows = [{question, answer, value}, {quesiton, answer, value}...]
 *    - reset = function() -> resets state of arrays 
 */
function App() {
  const [randomCategories, setRandomCategories] = useState([]);
  const [categoryClues, setCategoryClues] = useState([]);
  const [clueRows, setClueRows] = useState([]);
  const [reset, setReset] = useState(false);

  function resetGame() {
    setRandomCategories([]);
    setCategoryClues([]);
    setClueRows([]);
    if (!reset) {
      setReset(true);
    } else {
      setReset(false);
    }
  }

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
    }, [reset]
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
              value: clue.value
            }
            return clue;
          });

          let prev = 0;
          for (let clue of catClues) {
            if (clue.value === null) {
              clue.value = prev + 200;
            }
            prev = clue.value;
          }
          catClues.sort((a, b) => a.value - b.value);

          setCategoryClues(categoryClues => 
            [...categoryClues, {title: category.title, catClues: catClues}]
          );
        }
      }
      getCategory();
    }, [randomCategories]
  )

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
    <div className="app-main">
      <GameHeader/>
      <GameStart 
        clues={clueRows} 
        categories={categoryClues} 
        reset={resetGame}/>
    </div>
  );
}

export default App;
