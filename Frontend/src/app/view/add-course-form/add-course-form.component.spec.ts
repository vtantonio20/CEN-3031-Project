import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { environment } from 'src/environments/environment';

import { AddCourseFormComponent } from './add-course-form.component';

describe('AddCourseFormComponent', () => {
  let component: AddCourseFormComponent;
  let fixture: ComponentFixture<AddCourseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AddCourseFormComponent ],
      providers: [ AuthService, AngularFireAuth, { provide: FIREBASE_OPTIONS, useValue: environment.firebase } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Only logged in users can access the create a course page', () =>{
    expect(component.auth.isLoggedIn).toBeTruthy();
  })


  /*
  
  it('Only Teachers can acess the AddCourseFormComponent'), () =>{
    component.auth.user$.subscribe((teacher) => {
      expect(teacher?.role==='Teacher').toBeTruthy();
    })
  }
*/
  
});
