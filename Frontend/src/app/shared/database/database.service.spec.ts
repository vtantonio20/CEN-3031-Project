import { AuthService } from 'src/app/shared/auth/auth.service';
import { user } from 'rxfire/auth';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { DatabaseService } from './database.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [AngularFirestore, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, AuthService]
    });
    service = TestBed.inject(DatabaseService);
    const authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
