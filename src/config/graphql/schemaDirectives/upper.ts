import { getDirective } from "@graphql-tools/utils";
import { MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";

export default function UpperCaseDirective(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const upperDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];
      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        return {
          ...fieldConfig,
          resolver: async function (source, args, context, info) {
            const result = await resolve(source, args, context, info);
            if (typeof result === "string") {
              return result.toUpperCase();
            }
            return result;
          },
        };
      }
    },
  });
}
