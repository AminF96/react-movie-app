import Button from "../../../../Components/Button";
import "./style.css";

export default function NextBtn({ clickHandler }) {
  return (
    <Button
      title="Next Page"
      idValue="next"
      clickHandler={clickHandler}
    />
  );
}
