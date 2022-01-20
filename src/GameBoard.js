import axios from "axios";
import _ from "lodash";
import {useState, useEffect} from 'react';
const BASE_API_URL = "http://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

function GameBoard() {
  // state for gameboard for when questions clicked

  // const [gotCategories, setGotCategories] = useState(false);
  // const [gotCategoryIds, setGotCategoryIds] = useState(false);
  const [randomCategories, setRandomCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [categoryClues, setCategoryClues] = useState([]);

  // makes api call to jservice and retrieves 6 random categories
  // TODO: error handling (in case of server error or other)
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

  // retrieves category ids from state array of randomcategories
  // TODO: error handling?
  useEffect(
    function getCategoryIds() {
      setCategoryIds(randomCategories.map(data => data.id));
    }, [randomCategories]
  )

  // iterate over categoryIds and make api call to retrieve that category info
  // sets state of clues to be an array 
  useEffect(
    function getCat() {
      async function getCategory() {
        for (let id of categoryIds) {
          let response = await axios({
            url: `${BASE_API_URL}/category`,
            method: "GET",
            params: {id: id}
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
    }, [categoryIds]
  )

  console.log("CATEGORYCLUES--->", categoryClues);

  return (
    "GameBoard Component"
    // TODO:
      // will contain a table
      // table header will be the category titles
      // each cell below a category title will be a clue component
  );
}

export default GameBoard;