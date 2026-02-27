import styles from "./Navbar.module.css";

type NavbarProps = {
  children: React.ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className={styles.navbar} aria-label="Main">
      <div className={styles.inner}>{children}</div>
    </nav>
  );
}
