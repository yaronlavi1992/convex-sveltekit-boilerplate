import { Hono } from "hono";
import type { HonoWithConvex } from "convex-helpers/server/hono";
import { HttpRouterWithHono } from "convex-helpers/server/hono";
import { cors } from "hono/cors";
import type { ActionCtx } from "./_generated/server";
import { createAuth } from "./auth";

const app: HonoWithConvex<ActionCtx> = new Hono();

app.use(
  "/api/auth/*",
  cors({
    origin: process.env.SITE_URL || "http://localhost:5173",
    allowHeaders: ["Content-Type", "Authorization", "Better-Auth-Cookie"],
    allowMethods: ["GET", "POST", "OPTIONS"],
    exposeHeaders: ["Content-Length", "Set-Better-Auth-Cookie"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/.well-known/openid-configuration", async (c) => {
  return c.redirect("/api/auth/convex/.well-known/openid-configuration");
});

app.on(["POST", "GET"], "/api/auth/*", async (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

app.post("/api/polar/webhooks", async (c) => {
  const auth = createAuth(c.env);
  return auth.handler(c.req.raw);
});

const http = new HttpRouterWithHono(app);

export default http;
