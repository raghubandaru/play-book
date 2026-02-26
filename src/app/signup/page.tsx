import { signupAction } from "@/actions/auth";

export default function Signup() {
  return (
    <form action={signupAction}>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      <button type="submit">Sign up</button>
    </form>
  );
}
