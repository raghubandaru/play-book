import styles from "./Text.module.css";
import clsx from "clsx";

export default function Text({ variant = "body", children }: any) {
  return <div className={clsx(styles[variant])}>{children}</div>;
}
