import { Injectable } from "@nestjs/common";
import { CreateDriveDetailInput } from "./dto/create-drive-detail.input";
import { UpdateDriveDetailInput } from "./dto/update-drive-detail.input";

@Injectable()
export class DriveDetailService {
  create(createDriveDetailInput: CreateDriveDetailInput) {
    return "This action adds a new driveDetail";
  }

  findAll() {
    return `This action returns all driveDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} driveDetail`;
  }

  update(id: number, updateDriveDetailInput: UpdateDriveDetailInput) {
    return `This action updates a #${id} driveDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} driveDetail`;
  }
}
