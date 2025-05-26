export async function POST(req: Request) {
  const body: { password: string } = await req.json();
  const passwordRequired = process.env.RESUME_PASSWORD;
  if (body.password === passwordRequired) {
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
