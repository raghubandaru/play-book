type FormProps = {
  action: string | ((formData: FormData) => void | Promise<void>);
  children: React.ReactNode;
};

export default function Form({ action, children }: FormProps) {
  return <form action={action}>{children}</form>;
}
