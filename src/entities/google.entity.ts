import { Field, ObjectType } from "@nestjs/graphql";
import { IsEmail } from "class-validator";

@ObjectType()
export class Google {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  token: string;

  @Field({ nullable: true })
  name: string;

  @IsEmail()
  @Field({ nullable: true })
  email: string;
}
