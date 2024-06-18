import { MouseEvent } from "react";
import styles from "./SlideButton.module.css";

type SlideButtonProps = {
  onClick: (event: MouseEvent) => void;
  label: string;
};

function SlideButton({ onClick, label }: SlideButtonProps) {
  return (
    <button
      className={styles["unique-slide-button"]}
      onClick={event => onClick(event)}
    >
      <span>{label}</span>
    </button>
  );
}

export default SlideButton;
