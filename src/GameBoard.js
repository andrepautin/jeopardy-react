import axios from "axios";
const BASE_API_URL = "http://jservice.io/api/";
const NUM_CATEGORIES = 6;
const NUM_CLUES_PER_CAT = 5;

function GameBoard() {
  // state for gameboard for when questions clicked
  // state for if categories were collected
  // state for if categoryIds were collected
  // get categories from api

  let categories = [];
  let categoryIds = [];
  // TODO-- Get category ids
  async function getCategoryIds() {
    const response = await axios({
      url: `${BASE_API_URL}/categories`,
      method: "GET",
      params: {count: NUM_CATEGORIES}
    });
    console.log(response.data);
    return response.data;
  }
  getCategoryIds();

  console.log("rendered GameBoard component");
  return (
    "Gameboard component"
  );
}

export default GameBoard;