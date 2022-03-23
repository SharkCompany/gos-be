import { Test, TestingModule } from '@nestjs/testing';
import { DriveDetailResolver } from './drive-detail.resolver';
import { DriveDetailService } from './drive-detail.service';

describe('DriveDetailResolver', () => {
  let resolver: DriveDetailResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriveDetailResolver, DriveDetailService],
    }).compile();

    resolver = module.get<DriveDetailResolver>(DriveDetailResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
