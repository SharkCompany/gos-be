import { AuthenticationError } from "apollo-server-express";
import { defaultFieldResolver, GraphQLField } from "graphql";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";

export default function AuthDirective(schema, directiveName) {
  const typeDirectiveArgumentMaps: Record<string, any> = {};
  return mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const authDirective = getDirective(schema, type, directiveName)?.[0];
      if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective;
      }
      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async function (souce, args, context, info) {
          const { currentUser } = args;
          if (!currentUser) {
            throw new AuthenticationError(
              "Authentication token is invalid, please try again.",
            );
          }
        };
        return fieldConfig;
      }
    },
  });
}
