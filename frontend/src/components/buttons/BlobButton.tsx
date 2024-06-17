import styles from "./blobButton.module.css";

function BlobButton({ text }: { text: string }) {
  return (
    <div className={styles["buttons"]}>
      <button className={styles["blob-btn"]}>
        {text}
        <span className={styles["blob-btn__inner"]}>
          <span className={styles["blob-btn__blobs"]}>
            <span className={styles["blob-btn__blob"]} />
            <span className={styles["blob-btn__blob"]} />
            <span className={styles["blob-btn__blob"]} />
            <span className={styles["blob-btn__blob"]} />
          </span>
        </span>
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default BlobButton;
