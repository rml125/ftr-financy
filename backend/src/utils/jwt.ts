import jwt, { type SignOptions } from "jsonwebtoken";

export type JwtPayload = {
  id: string;
  email: string;
};

const secretFromEnv = () => {
  const s = process.env.JWT_SECRET;
  if (!s) {
    throw new Error("JWT_SECRET is not set");
  }
  return s;
};

export function signJwt(
  payload: JwtPayload,
  expiresIn: SignOptions["expiresIn"] = "15m"
) {
  return jwt.sign(payload, secretFromEnv(), { expiresIn });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, secretFromEnv()) as JwtPayload;
}
