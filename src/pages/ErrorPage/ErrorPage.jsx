import "./style.css";

export default function ErrorPage() {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="row">
        <div className="col-12 text-center">
          <i className="fas fa-exclamation-circle err-img mb-3"></i>
          <p className="text-white text-center err-first">
            THER IS A PROBLEM IN LOADING THIS PAGE !
          </p>
          <p className="text-white text-center err-second">
            PLEASE CHECK YOUR INTERNET CONNECTION AND TRY AGAIN.
          </p>
        </div>
      </div>
    </div>
  );
}
