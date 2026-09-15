// Cloudflare Pages Function — GET /auth
// Step 1 of the Decap CMS "self-hosted OAuth provider" handshake: redirect
// the popup window to GitHub's authorize screen. GITHUB_CLIENT_ID must be
// set as an environment variable on the Cloudflare Pages project (Settings
// → Environment variables) — never hardcode it here.
export async function onRequestGet(context) {
  const { env, request } = context;

  if (!env.GITHUB_CLIENT_ID) {
    return new Response("Missing GITHUB_CLIENT_ID environment variable on this Pages project.", { status: 500 });
  }

  const url = new URL(request.url);
  const redirectUri = `${url.origin}/callback`;
  const state = crypto.randomUUID();

  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);

  return Response.redirect(authorizeUrl.toString(), 302);
}
