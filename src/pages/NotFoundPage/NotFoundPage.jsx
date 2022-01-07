import error from "./404 error.svg";
import "./style.css";

export default function NotFoundPage() {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="row">
        <div className="col-12 text-center">
          <img src={error} alt="404!" />
          <p className="text-white text-center">
            THE PAGE YOU WERE LOKING FOR DOESN'T EXIST!
          </p>
        </div>
      </div>
    </div>
  );
}
