import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LectureCardComponent } from './lecture-card/lecture-card.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    CourseCardComponent,
    LectureCardComponent,
    ChatComponent
    ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  exports: [  
    HeaderComponent,
    CourseCardComponent,
    LectureCardComponent,
    ChatComponent
  ]
})
export class CoreModule { }
