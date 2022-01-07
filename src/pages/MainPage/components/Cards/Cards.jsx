import { useNavigate } from "react-router-dom";
import { paths } from "../../../../router/paths";
import generateKey from "../../../../utils/generateKey";
import movieGenres from "./movieGenresObj";
import defaultPoster from "./movie.jpg";
import Card from "../../../../Components/Card";

export default function Cards({ moviesList }) {
  const navigate = useNavigate();
  
  let movies = "";

  if (moviesList !== undefined) {
    try {
      movies = moviesList.map((movie) => {
        const genres = movie.genre_ids.slice(0, 2).map((id) => movieGenres[id]);

        return (
          <Card
            key={generateKey()}
            poster={
              movie.poster_path !== null
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultPoster
            }
            title={
              movie.title.length <= 40
                ? movie.title
                : `${movie.title.substr(0, 35)}...`
            }
            genres={genres.join("-")}
            lang={movie.original_language}
            vote={movie.vote_average}
            year={
              movie.release_date !== undefined
                ? movie.release_date.substr(0, 4)
                : "-"
            }
          />
        );
      });
    } catch (error) {
      navigate(paths.ERROR, { replace: false });
    }
  }

  return <div className="row">{movies}</div>;
}
