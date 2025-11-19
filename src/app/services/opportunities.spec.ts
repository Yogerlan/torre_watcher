import { TestBed } from '@angular/core/testing';

import { OpportunitiesService } from './opportunities';

describe('Opportunities', () => {
  let service: OpportunitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpportunitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
