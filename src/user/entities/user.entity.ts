import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field({ description: `nam|nu` })
  gender: string;
}
