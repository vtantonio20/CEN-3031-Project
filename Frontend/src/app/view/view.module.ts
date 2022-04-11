import { DatabaseService } from './../shared/database/database.service';
import { CoursePageComponent } from './course-page/course-page.component';
import { AuthService } from './../shared/auth/auth.service';
import { RouterModule } from '@angular/router';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCourseFormComponent } from './add-course-form/add-course-form.component';
import { LectureVidPageComponent } from './lecture-vid-page/lecture-vid-page.component';
import { ProfileComponent } from './profile/profile.component';
//import { MediaPlayerComponent } from './media-player/media-player.component';
//import { JoinACourseComponent } from './join-a-course/join-a-course.component';

@NgModule({
  declarations: [
    HomeComponent,
    PageNotFoundComponent,
    DashboardComponent,
    RegistrationComponent,
    AddCourseFormComponent,
    CoursePageComponent,
    LectureVidPageComponent,
    ProfileComponent,
   //MediaPlayerComponent,
   // JoinACourseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  exports: [
    HomeComponent,
    DashboardComponent,
    CoursePageComponent,
    LectureVidPageComponent
  ],
  providers: [
    AuthService,
    DatabaseService
  ],

})
export class ViewModule { }
