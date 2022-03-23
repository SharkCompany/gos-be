import { Injectable } from "@nestjs/common";
import { CreateDriveInput } from "./dto/create-drive.input";
import { UpdateDriveInput } from "./dto/update-drive.input";

@Injectable()
export class DriveService {
  create(createDriveInput: CreateDriveInput) {
    return "This action adds a new drive";
  }

  findAll() {
    return `This action returns all drive`;
  }

  findOne(id: number) {
    return `This action returns a #${id} drive`;
  }

  update(id: number, updateDriveInput: UpdateDriveInput) {
    return `This action updates a #${id} drive`;
  }

  remove(id: number) {
    return `This action removes a #${id} drive`;
  }
}
