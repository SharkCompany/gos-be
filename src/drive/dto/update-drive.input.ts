import { CreateDriveInput } from "./create-drive.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateDriveInput extends PartialType(CreateDriveInput) {
  @Field(() => Int)
  id: number;
}
