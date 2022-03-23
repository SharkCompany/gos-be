import { defaultFieldResolver, GraphQLField } from "graphql";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";

export default function ConcatDirective(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const concatDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (concatDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = async (source, args, context, info) => {
          const result = resolve(source, args, context, info);
          const { value } = args;
          if (typeof result !== "undefined") {
            return `${result}${value}`;
          }
          return result;
        };
        return fieldConfig;
      }
    },
  });
}
