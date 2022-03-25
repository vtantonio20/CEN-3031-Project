import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureVidPageComponent } from './lecture-vid-page.component';

describe('LectureVidPageComponent', () => {
  let component: LectureVidPageComponent;
  let fixture: ComponentFixture<LectureVidPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectureVidPageComponent ]
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
});
