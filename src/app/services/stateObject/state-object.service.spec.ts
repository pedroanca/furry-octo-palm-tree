import { TestBed } from '@angular/core/testing';

import { StateObjectService } from './state-object.service';

describe('StateObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StateObjectService = TestBed.get(StateObjectService);
    expect(service).toBeTruthy();
  });
});
