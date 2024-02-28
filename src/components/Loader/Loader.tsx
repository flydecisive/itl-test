import styles from "./Loader.module.scss";

interface LoaderProps {
  template: string;
}

function Loader({ template }: LoaderProps) {
  return (
    <div
      className={`${styles.loader} ${
        template === "grid" ? styles["loader-grid"] : styles["loader-flex"]
      }`}
    ></div>
  );
}

export default Loader;
