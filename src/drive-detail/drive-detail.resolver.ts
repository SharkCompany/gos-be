import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DriveDetailService } from "./drive-detail.service";
import { DriveDetail } from "./entities/drive-detail.entity";
import { CreateDriveDetailInput } from "./dto/create-drive-detail.input";
import { UpdateDriveDetailInput } from "./dto/update-drive-detail.input";

@Resolver(() => DriveDetail)
export class DriveDetailResolver {
  constructor(private readonly driveDetailService: DriveDetailService) {}

  @Mutation(() => DriveDetail)
  createDriveDetail(
    @Args("createDriveDetailInput")
    createDriveDetailInput: CreateDriveDetailInput,
  ) {
    return this.driveDetailService.create(createDriveDetailInput);
  }

  @Query(() => [DriveDetail], { name: "driveDetail" })
  findAll() {
    return this.driveDetailService.findAll();
  }

  @Query(() => DriveDetail, { name: "driveDetail" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.driveDetailService.findOne(id);
  }

  @Mutation(() => DriveDetail)
  updateDriveDetail(
    @Args("updateDriveDetailInput")
    updateDriveDetailInput: UpdateDriveDetailInput,
  ) {
    return this.driveDetailService.update(
      updateDriveDetailInput.id,
      updateDriveDetailInput,
    );
  }

  @Mutation(() => DriveDetail)
  removeDriveDetail(@Args("id", { type: () => Int }) id: number) {
    return this.driveDetailService.remove(id);
  }
}
