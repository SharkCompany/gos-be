import { MapperKind } from "@graphql-tools/utils";
import { getDirective } from "@graphql-tools/utils";
import { mapSchema } from "@graphql-tools/utils";
import axios from "axios";

export default function RestDirective(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const restDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];
      if (restDirective) {
        const { url } = restDirective;
        fieldConfig.resolve = () => axios(url);
        return fieldConfig;
      }
    },
  });
}
