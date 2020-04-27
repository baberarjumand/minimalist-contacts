import { TestBed } from '@angular/core/testing';

import { LocalContactService } from './local-contact.service';

describe('LocalContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalContactService = TestBed.get(LocalContactService);
    expect(service).toBeTruthy();
  });
});
