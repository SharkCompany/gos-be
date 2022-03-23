import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { DriveService } from "./drive.service";
import { Drive } from "./entities/drive.entity";
import { CreateDriveInput } from "./dto/create-drive.input";
import { UpdateDriveInput } from "./dto/update-drive.input";

@Resolver(() => Drive)
export class DriveResolver {
  constructor(private readonly driveService: DriveService) {}

  @Mutation(() => Drive)
  createDrive(@Args("createDriveInput") createDriveInput: CreateDriveInput) {
    return this.driveService.create(createDriveInput);
  }

  @Query(() => [Drive], { name: "drive" })
  findAll() {
    return this.driveService.findAll();
  }

  @Query(() => Drive, { name: "drive" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.driveService.findOne(id);
  }

  @Mutation(() => Drive)
  updateDrive(@Args("updateDriveInput") updateDriveInput: UpdateDriveInput) {
    return this.driveService.update(updateDriveInput.id, updateDriveInput);
  }

  @Mutation(() => Drive)
  removeDrive(@Args("id", { type: () => Int }) id: number) {
    return this.driveService.remove(id);
  }
}
