import { ObjectType, Field, ID, extend, Float, Int } from "@nestjs/graphql";
import { BaseModel } from "@common/model/base.model";
import { DriveStatus } from "@common/drive/drive-status";

@ObjectType()
export class DriveDetail extends BaseModel {
  @Field(() => ID)
  driver: string;

  @Field(() => ID)
  drive: string;

  @Field(() => ID)
  passenger: string;

  @Field()
  start: Date;

  @Field()
  end: Date;

  @Field(() => Float)
  rate: number;

  @Field(() => Int)
  price: number;

  @Field()
  cancelReason: string;

  @Field(() => DriveStatus)
  status: DriveStatus;
}
