import { TestBed } from '@angular/core/testing';

import { LocalStorageServiceTsService } from './local-storage.service.ts.service';

describe('LocalStorageServiceTsService', () => {
  let service: LocalStorageServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
