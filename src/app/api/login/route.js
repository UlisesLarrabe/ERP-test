import { cookies } from "next/headers";

export async function POST(req) {
  const body = await req.json();
  const passwordRequired = process.env.PASSWORD_LOGIN;
  const emailRequired = process.env.EMAIL_LOGIN;
  const newCookies = await cookies();
  if (body.password === passwordRequired && body.email === emailRequired) {
    newCookies.set({
      name: "auth",
      value: { isLogged: true },
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return Response.json({
      status: 200,
      message: "Login success",
    });
  }
  return Response.json({
    status: 401,
    message: "Login failed",
  });
}
