import { TestBed } from '@angular/core/testing';

import { CoursePageGuardGuard } from './course-page-guard.guard';

describe('CoursePageGuardGuard', () => {
  let guard: CoursePageGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoursePageGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
