import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
import { DriveStatus } from "src/common/drive/drive-status";
import { BaseModel } from "src/common/model/base.model";

@ObjectType()
export class Drive extends BaseModel {
  @Field(() => ID, { description: "driver unique id" })
  driver: string;

  @Field()
  start: Date;

  @Field()
  destination: string;

  @Field()
  status: DriveStatus;
}
