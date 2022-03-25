import { TestBed } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
