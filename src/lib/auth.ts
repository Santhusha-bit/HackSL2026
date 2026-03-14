import { createHmac, timingSafeEqual } from "crypto";

const SESSION_COOKIE = "hacksl_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

function getSecret(): string {
  return process.env.HACKSL_ADMIN_SECRET || "hacksl-admin-2025";
}

function getAdminCredentials(): { username: string; password: string } {
  return {
    username: process.env.HACKSL_ADMIN_USERNAME || "admin",
    password: process.env.HACKSL_ADMIN_PASSWORD || "hacksl-admin-2025",
  };
}

export function verifyCredentials(
  username: string,
  password: string
): boolean {
  const { username: expectedUser, password: expectedPass } = getAdminCredentials();

  const userBuf = Buffer.from(username, "utf8");
  const passBuf = Buffer.from(password, "utf8");
  const expectedUserBuf = Buffer.from(expectedUser, "utf8");
  const expectedPassBuf = Buffer.from(expectedPass, "utf8");

  if (userBuf.length !== expectedUserBuf.length || passBuf.length !== expectedPassBuf.length) {
    return false;
  }
  return (
    timingSafeEqual(userBuf, expectedUserBuf) &&
    timingSafeEqual(passBuf, expectedPassBuf)
  );
}

export function createSessionToken(username: string): string {
  const payload = {
    u: username,
    exp: Date.now() + SESSION_MAX_AGE * 1000,
  };
  const payloadStr = JSON.stringify(payload);
  const payloadB64 = Buffer.from(payloadStr).toString("base64url");
  const sig = createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return false;

    const expectedSig = createHmac("sha256", getSecret())
      .update(payloadB64)
      .digest("base64url");

    if (expectedSig.length !== sig.length) return false;
    if (!timingSafeEqual(Buffer.from(expectedSig), Buffer.from(sig))) return false;

    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8")
    );
    return payload.exp > Date.now() && !!payload.u;
  } catch {
    return false;
  }
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: SESSION_MAX_AGE,
    path: "/",
  };
}
