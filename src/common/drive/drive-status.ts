import { registerEnumType } from "@nestjs/graphql";

export enum DriveStatus {
  waiting = "waiting", // 'vua moi tao, cho passenger accept']
  preparing = "preparing", // 'da accept, nhung chua toi gio di']
  on_road = "on_road",
  complete = "complete",
  fail = "fail",
  canceled = "canceled",
}
registerEnumType(DriveStatus, {
  name: "DriveStaus",
  description: "Posible status or drives when created by user",
});
