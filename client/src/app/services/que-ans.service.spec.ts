import { TestBed } from '@angular/core/testing';

import { QueAnsService } from './que-ans.service';

describe('QueAnsService', () => {
  let service: QueAnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueAnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
