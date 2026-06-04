import type { ExpressContextFunctionArgument } from "@as-integrations/express5";
import { verifyJwt } from "../utils/jwt.js";

export type GraphQLContext = {
  userId: string | undefined;
  req: ExpressContextFunctionArgument["req"];
  res: ExpressContextFunctionArgument["res"];
};

export async function buildContext({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphQLContext> {
  const authHeader = req.headers.authorization;
  let userId: string | undefined;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice("Bearer ".length);
    try {
      const payload = verifyJwt(token);
      userId = payload.id;
    } catch {
      userId = undefined;
    }
  }

  return { userId, req, res };
}
