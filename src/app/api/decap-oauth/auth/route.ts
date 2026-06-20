import { NextResponse } from "next/server";

// Inicia o login OAuth do GitHub para o Decap CMS (/admin). Ver docs/backoffice.md.
export async function GET(request: Request) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "OAUTH_GITHUB_CLIENT_ID não configurado" }, { status: 500 });
  }

  const redirectUri = new URL("/api/decap-oauth/callback", request.url).toString();
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");

  return NextResponse.redirect(authorizeUrl.toString());
}
