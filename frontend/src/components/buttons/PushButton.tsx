import { MouseEvent } from "react";
import styles from "./PushButton.module.css";

interface PushButtonProps {
  label: string;
  onClick: (event: MouseEvent) => void;
}

function PushButton({ onClick, label }: PushButtonProps) {
  return (
    <button className={styles["push-button"]} onClick={event => onClick(event)}>
      {label}
    </button>
  );
}

export default PushButton;
