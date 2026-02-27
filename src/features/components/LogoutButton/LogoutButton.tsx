import { logoutAction } from "@/actions/auth";
import Button from "@/components/atoms/Button/Button";
import Form from "@/components/molecules/Form/Form";

export default function LogoutButton() {
  return (
    <Form action={logoutAction}>
      <Button type="submit">Logout</Button>
    </Form>
  );
}
