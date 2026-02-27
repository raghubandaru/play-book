import styles from "./Button.module.css";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  onClick,
  ...rest
}: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.button, styles[variant])}
      {...rest}
    >
      {children}
    </button>
  );
}
