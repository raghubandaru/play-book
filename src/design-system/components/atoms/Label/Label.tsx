import styles from "./Label.module.css";

export default function Label(props: any) {
  return <label {...props} className={styles.label} />;
}
