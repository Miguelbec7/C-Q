import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const user = process.env.BACKOFFICE_USER;
  const pass = process.env.BACKOFFICE_PASSWORD;

  if (!user || !pass) {
    return new NextResponse("Backoffice não configurado. Defina BACKOFFICE_USER e BACKOFFICE_PASSWORD.", {
      status: 503,
    });
  }

  const authHeader = request.headers.get("authorization");
  const expected = "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");

  if (authHeader === expected) {
    return NextResponse.next();
  }

  return new NextResponse("Autenticação necessária", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="C&Q Backoffice"' },
  });
}

export const config = {
  matcher: ["/backoffice/:path*"],
};
