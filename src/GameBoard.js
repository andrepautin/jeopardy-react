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
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);

  // TODO-- Get category ids
  useEffect (
    function getCategories() {
      async function getCategoriesSample() {
        const response = await axios({
          url: `${BASE_API_URL}/categories`,
          method: "GET",
          params: {count: 100, offset: Math.floor(Math.random() * 1000)}
        });
        let sample = _.sampleSize(response.data, NUM_CATEGORIES);
        console.log("SAMPLE--->", sample);
        // setGotCategories(true);
        setCategories(sample);
        // setGotCategories(true);
        // console.log("GOTCATEGORIES--->", gotCategories);
        // console.log("GOTCATEGORYIDS--->", gotCategoryIds);
        // console.log("CATEGORYIDS--->", categoryIds);
      }
      getCategoriesSample();
    }, []
  )

  useEffect (
    function getIds() {
      async function getCategoryIds() {
        console.log("CATEGORYIDS--->", categories.map(data => data.id));
        setCategoryIds(categories.map(data => data.id));
      }
      getCategoryIds();
    }, [categories]
  )

  return (
    "Gameboard component"
  );
}

export default GameBoard;