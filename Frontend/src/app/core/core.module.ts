import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LectureCardComponent } from './lecture-card/lecture-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CourseCardComponent,
    LectureCardComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  exports: [  
    HeaderComponent,
    CourseCardComponent,
    LectureCardComponent
  ]
})
export class CoreModule { }
