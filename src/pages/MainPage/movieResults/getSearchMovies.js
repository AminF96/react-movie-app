import { get } from "../../../services/http";

// send request to api in search format
export const getSearchMovies = async (movieTitle, pageNum) => {
  return (
    await get(
      `search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${movieTitle}&page=${pageNum}`
    )
  ).data;
};
