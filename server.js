const http = require("http");

const PORT = process.env.PORT || 3000;
const BRANCH = process.env.PREVIEW_BRANCH || "unknown";
const APP_URL = process.env.APP_URL || "http://localhost:" + PORT;
const DB_URL = process.env.DATABASE_URL || "not set";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", branch: BRANCH }));
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(`<!DOCTYPE html>
<html>
<head><title>Preview: ${BRANCH}</title></head>
<body style="font-family: system-ui; max-width: 600px; margin: 80px auto; padding: 0 20px;">
  <h1>Preview Deployment</h1>
  <table style="border-collapse: collapse;">
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Branch:</td><td>${BRANCH}</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">URL:</td><td>${APP_URL}</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Database:</td><td>${DB_URL ? "connected" : "not set"}</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Node:</td><td>${process.version}</td></tr>
    <tr><td style="padding: 4px 12px 4px 0; font-weight: bold;">Time:</td><td>${new Date().toISOString()}</td></tr>
  </table>
</body>
</html>`);
});

server.listen(PORT, () => {
  console.log(`Preview app listening on port ${PORT}`);
});
