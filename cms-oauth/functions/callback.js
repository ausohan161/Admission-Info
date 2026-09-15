// Cloudflare Pages Function — GET /callback
// Step 2 of the Decap CMS OAuth handshake: exchange GitHub's ?code= for an
// access token, then hand it back to the admin page (the CMS popup window)
// via the exact postMessage protocol Decap CMS expects. Needs
// GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET set as environment variables on
// this Cloudflare Pages project (Settings → Environment variables).
export async function onRequestGet(context) {
  const { env, request } = context;

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return new Response("Missing GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET environment variables on this Pages project.", { status: 500 });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) return new Response("Missing ?code from GitHub.", { status: 400 });

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || tokenData.error || !tokenData.access_token) {
    return new Response(`GitHub OAuth error: ${tokenData.error_description || tokenData.error || "unknown error"}`, { status: 400 });
  }

  const message = "authorization:github:success:" + JSON.stringify({ token: tokenData.access_token, provider: "github" });

  // Decap CMS's documented self-hosted-OAuth handshake: the popup announces
  // itself, waits for the opener (the /admin page) to acknowledge, then
  // sends the token. This exact two-step exchange is required — sending the
  // token immediately on load is a common mistake that silently fails.
  const html = `<!doctype html>
<html><body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(${JSON.stringify(message)}, e.origin);
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
লগইন সফল হয়েছে — এই উইন্ডোটি বন্ধ করে দিতে পারেন।
</body></html>`;

  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}
