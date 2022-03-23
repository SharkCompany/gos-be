import { defaultFieldResolver, GraphQLString } from "graphql";
import formatDate from "dateformat";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";

export default function DateFormatDirective(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const dateFormatDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];
      if (dateFormatDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        const { defaultFormat } = dateFormatDirective;
        if (!fieldConfig.args)
          throw new Error("Unexpected Error. args should be defined.");
        fieldConfig.args["format"] = { type: GraphQLString };

        fieldConfig.type = GraphQLString;
        fieldConfig.resolve = async (
          source,
          { format, ...args },
          context,
          info,
        ) => {
          const newFormat = format || defaultFormat;
          const date = await resolve(source, args, context, info);
          return formatDate(date, newFormat, true);
        };
        return fieldConfig;
      }
    },
  });
}
