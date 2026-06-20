import { NextResponse } from "next/server";

// Troca o code do GitHub por um access_token e devolve-o ao popup do Decap CMS
// via postMessage, seguindo o protocolo esperado pelo backend "github" do CMS.
// Ver docs/backoffice.md.
function renderMessage(success: boolean, payload: Record<string, unknown>) {
  const status = success ? "success" : "error";
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const safeMessage = JSON.stringify(message).replace(/</g, "\\u003c");

  return `<!doctype html>
<html><body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(${safeMessage}, e.origin);
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body></html>`;
}

function htmlResponse(body: string) {
  return new NextResponse(body, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;

  if (!code || !clientId || !clientSecret) {
    return htmlResponse(renderMessage(false, { message: "Configuração OAuth incompleta no servidor." }));
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });

  const data = (await tokenResponse.json().catch(() => null)) as {
    access_token?: string;
    error_description?: string;
  } | null;

  if (!data?.access_token) {
    return htmlResponse(
      renderMessage(false, { message: data?.error_description ?? "Falha ao obter o token do GitHub." })
    );
  }

  return htmlResponse(renderMessage(true, { token: data.access_token, provider: "github" }));
}
