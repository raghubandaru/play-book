import styles from "./AuthForm.module.css";

import { Button, Input, Label } from "@ds";

type Field = {
  name: string;
  label: string;
  type?: string;
};

export default function AuthForm({
  title,
  fields,
  submitLabel,
  action,
  footer,
}: {
  title: string;
  fields: Field[];
  submitLabel: string;
  action: (formData: FormData) => Promise<void>;
  footer?: React.ReactNode;
}) {
  return (
    <form action={action}>
      <div className={styles.title}>{title}</div>

      {fields.map((field) => (
        <div key={field.name} className={styles.field}>
          <Label htmlFor={field.name}>{field.label}</Label>

          <Input
            id={field.name}
            name={field.name}
            type={field.type || "text"}
            required
          />
        </div>
      ))}

      <Button type="submit">{submitLabel}</Button>

      {footer && <div className={styles.footer}>{footer}</div>}
    </form>
  );
}
