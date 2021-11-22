import { get } from "../../../services/http";

const getAllMovies = async (sortOrder, pageNum) => {
  return (
    await get(
      `movie/${sortOrder}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${pageNum}`
    )
  ).data;
};

export default getAllMovies;
