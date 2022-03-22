import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinACourseComponent } from './join-a-course.component';

describe('JoinACourseComponent', () => {
  let component: JoinACourseComponent;
  let fixture: ComponentFixture<JoinACourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinACourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinACourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
