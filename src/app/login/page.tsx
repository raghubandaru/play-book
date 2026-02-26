import { loginAction } from "@/actions/auth";

export default function Login() {
  return (
    <form action={loginAction}>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      <button type="submit">Login</button>
    </form>
  );
}
