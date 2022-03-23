import { CreateDriveDetailInput } from "./create-drive-detail.input";
import { InputType, Field, Int, PartialType } from "@nestjs/graphql";

@InputType()
export class UpdateDriveDetailInput extends PartialType(
  CreateDriveDetailInput,
) {
  @Field(() => Int)
  id: number;
}
