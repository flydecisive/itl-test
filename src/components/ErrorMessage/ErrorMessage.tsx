import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  template: string;
}

function ErrorMessage({ template }: ErrorMessageProps) {
  return (
    <p
      className={`${styles.error} ${
        template === "grid" ? styles["error-grid"] : styles["error-flex"]
      }`}
    >
      Не удалось загрузить данные. Попробуйте позже.
    </p>
  );
}

export default ErrorMessage;
