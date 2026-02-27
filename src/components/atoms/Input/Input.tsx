import styles from "./Input.module.css";

export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>,
) {
  return <input {...props} className={styles.input} />;
}
