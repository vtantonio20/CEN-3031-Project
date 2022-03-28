import { user } from 'rxfire/auth';
import { TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { shareReplay } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthService, AngularFireAuth, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Whenever valid credientials are passed in. User should be logged in', () => {
    service.login('test@gmail.com', 'password');
    expect(service.isLoggedIn()).toBeTruthy();
  })
});
