import { Test, TestingModule } from '@nestjs/testing';
import { DriveDetailService } from './drive-detail.service';

describe('DriveDetailService', () => {
  let service: DriveDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriveDetailService],
    }).compile();

    service = module.get<DriveDetailService>(DriveDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
