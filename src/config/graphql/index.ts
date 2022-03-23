import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { GraphqlConfig } from "@config/common";
import { END_POINT, ACCESS_TOKEN } from "@environments/index";

@Injectable()
class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createGqlOptions(): Promise<Omit<GqlModuleOptions<any>, "driver">> {
    const graphqlConfig = this.configService.get<GraphqlConfig>("graphql");
    return {
      resolverValidationOptions: {
        requireResolversForResolveType: "error",
      },
      autoSchemaFile: graphqlConfig.schemaDestination || "./src/schema.graphql",
      sortSchema: graphqlConfig.sortSchema,
      path: `/${END_POINT!}`,
      context: async ({ req, res, connection }) => {
        if (connection) {
          const { currentUser } = connection.context;

          return {
            currentUser,
          };
        }

        let currentUser;

        // console.log(ACCESS_TOKEN, req.headers)

        const token = req.headers[ACCESS_TOKEN!] || "";

        // console.log('token', token)
        if (token) {
          // currentUser = await verifyToken(token, 'accessToken');
          currentUser = "faker";
        }

        // console.log(currentUser);

        return {
          req,
          res,
          currentUser,
          trackErrors(errors) {
            // Track the errors
            // console.log(errors)
          },
        };
      },
    };
  }
}

export default GqlConfigService;
