import { TestBed } from '@angular/core/testing';

import { HomeGuardGuard } from './home-guard.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

describe('HomeGuardGuard', () => {
  let guard: HomeGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [AngularFirestore, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, AuthService]
    });
    guard = TestBed.inject(HomeGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
