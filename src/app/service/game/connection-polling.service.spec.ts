import { TestBed } from '@angular/core/testing';

import { ConnectionPollingService } from './connection-polling.service';

describe('ConnectionPollingService', () => {
  let service: ConnectionPollingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectionPollingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
