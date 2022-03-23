import { InputType, Int, Field } from "@nestjs/graphql";

@InputType()
export class CreateDriveInput {
  @Field(() => Int, { description: "Example field (placeholder)" })
  exampleField: number;
}
