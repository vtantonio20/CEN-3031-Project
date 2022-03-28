import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { environment } from 'src/environments/environment';

import { LectureVidPageComponent } from './lecture-vid-page.component';

describe('LectureVidPageComponent', () => {
  let component: LectureVidPageComponent;
  let fixture: ComponentFixture<LectureVidPageComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ LectureVidPageComponent ],
      providers: [  AuthService, AngularFireAuth, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }, {provide: ActivatedRoute, useValue: fakeActivatedRoute} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureVidPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('User is actually logged in', () =>{
    expect(component.auth.isLoggedIn).toBeTruthy();
  })
});
