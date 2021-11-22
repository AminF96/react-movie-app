import "./style.css";

export default function Card({ poster, title, genres, lang, vote, year }) {
  return (
    <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
      <div className="card rounded-0 border-0 shadow">
        <img src={poster} className="card-img-top rounded-0" alt="..." />
        <div className="card-body">
          <h5 className="card-title mb-1">{title}</h5>
          <div>
            <span className="info-key">Genres:</span>
            <span className="info-value text-muted">{genres}</span>
          </div>
          <div>
            <span className="info-key">Language:</span>
            <span className="info-value text-muted">{lang}</span>
          </div>
          <div>
            <span className="info-key">Vote Average:</span>
            <span className="info-value text-muted">{vote}</span>
          </div>
          <div>
            <span className="info-key">Release Year:</span>
            <span className="info-value text-muted">{year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
