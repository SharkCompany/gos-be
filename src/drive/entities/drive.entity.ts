import { DriveStatus } from "@common/drive/drive-status";
import { BaseModel } from "@common/model/base.model";
import { ObjectType, Field, Int, ID } from "@nestjs/graphql";

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
