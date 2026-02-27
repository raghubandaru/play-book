"use client";

import { useActionState, useState } from "react";
import styles from "./AuthForm.module.css";
import { Button, Form, Input, Label } from "@ds";
import type { ActionState } from "@/lib/action-state";
import { z } from "zod";
import { loginSchema, signupSchema } from "@/lib/schemas/auth";

const schemas = {
  login: loginSchema,
  signup: signupSchema,
};

type SchemaKey = keyof typeof schemas;

type Field = {
  name: string;
  label: string;
  type?: string;
};

type Props = {
  title: string;
  fields: Field[];
  submitLabel: string;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  schemaKey?: SchemaKey;
  footer?: React.ReactNode;
};

export default function AuthForm({
  title,
  fields,
  submitLabel,
  action,
  schemaKey,
  footer,
}: Props) {
  const [state, formAction, isPending] = useActionState(action, {
    errors: {},
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [values, setValues] = useState<Record<string, string>>({});
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  function validateField(name: string, value: string) {
    if (!schemaKey) return;
    const schema = schemas[schemaKey];
    const fieldSchema = (schema.shape as Record<string, z.ZodTypeAny>)[name];
    if (!fieldSchema) return;

    const result = fieldSchema.safeParse(value);
    setClientErrors((prev) => ({
      ...prev,
      [name]: result.success ? "" : (result.error.issues[0]?.message ?? ""),
    }));
  }

  function handleBlur(name: string, value: string) {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  }

  function handleChange(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  }

  function getFieldError(name: string): string | null {
    if (touched[name]) return clientErrors[name] || null;
    return state.errors?.[name] ?? null;
  }

  const hasErrors = fields.some((field) => !!getFieldError(field.name));

  return (
    <Form action={formAction}>
      <div className={styles.title}>{title}</div>

      {state.errors?.general && (
        <div className={styles.formError}>{state.errors.general}</div>
      )}

      {fields.map((field) => (
        <div key={field.name} className={styles.field}>
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            name={field.name}
            type={field.type || "text"}
            value={values[field.name] ?? ""}
            onBlur={(e) => handleBlur(field.name, e.target.value)}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
          {getFieldError(field.name) && (
            <span className={styles.fieldError}>
              {getFieldError(field.name)}
            </span>
          )}
        </div>
      ))}

      <Button type="submit" disabled={isPending || hasErrors}>
        {isPending ? "Loading…" : submitLabel}
      </Button>

      {footer && <div className={styles.footer}>{footer}</div>}
    </Form>
  );
}
