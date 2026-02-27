import styles from "./Navbar.module.css";

type NavbarProps = {
  children: React.ReactNode;
};

export default function Navbar({ children }: NavbarProps) {
  return (
    <div className={styles.navbar}>
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
