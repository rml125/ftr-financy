import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { buildSchema } from "type-graphql";
import cors from "cors";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildContext } from "./graphql/context.js";
import { AuthResolver } from "./resolvers/auth.resolver.js";
import { CategoryResolver } from "./resolvers/category.resolver.js";
import { TransactionResolver } from "./resolvers/transaction.resolver.js";
import { UserResolver } from "./resolvers/user.resolver.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, "..", "schema.graphql");

async function bootstrap() {
  const app = express();
  app.use(cors());

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      UserResolver,
      CategoryResolver,
      TransactionResolver,
    ],
    validate: false,
    emitSchemaFile: schemaPath,
  });

  const server = new ApolloServer({ schema });
  await server.start();

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, { context: buildContext })
  );

  const port = Number(process.env.PORT) || 4000;
  app.listen(port, () => {
    console.log(`Servidor iniciado em http://localhost:${port}/graphql`);
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
