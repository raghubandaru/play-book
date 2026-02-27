import styles from "./Navbar.module.css";

export default function Navbar({ children }) {
  return <div className={styles.navbar}>{children}</div>;
}
