"use client";

export default function Signup() {
  async function signUpUser(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return;

    window.location.href = "/me";
  }

  return (
    <form action={signUpUser}>
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
