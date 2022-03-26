import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { FileFormComponent } from './file-form.component';

describe('FileFormComponent', () => {
  let component: FileFormComponent;
  let fixture: ComponentFixture<FileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileFormComponent ],
      providers: [HttpClient, HttpHandler, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
