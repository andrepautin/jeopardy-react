import axios from "axios";
import _ from "lodash";
import {useState, useEffect} from 'react';
const BASE_API_URL = "http://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

function GameBoard() {
  // state for gameboard for when questions clicked
  // state for if categories were collected
  const [gotCategories, setGotCategories] = useState(false);
  const [categoryIds, setCategoryIds] = useState();
  // state for if categoryIds were collected

  // let categories = [];
  // let categoryIds = [];
  // TODO-- Get category ids
  useEffect (
    function getIds() {
      async function getCategoryIds() {
        const response = await axios({
          url: `${BASE_API_URL}/categories`,
          method: "GET",
          params: {count: 100, offset: Math.floor(Math.random() * 1000)}
        });
        let sample = _.sampleSize(response.data, NUM_CATEGORIES);
        setGotCategories(true);
        setCategoryIds(sample.map(data => data.id));
        console.log(categoryIds);
        console.log(sample);
        return response.data;
      }
      getCategoryIds();
    }, []
  )

  return (
    "Gameboard component"
  );
}

export default GameBoard;