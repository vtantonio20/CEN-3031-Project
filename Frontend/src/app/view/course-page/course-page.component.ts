import { DatabaseService } from 'src/app/shared/database/database.service';
import { AuthService } from './../../shared/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Course } from 'src/app/shared/models/course';
import { Lecture } from 'src/app/shared/models/lecture';
import { User } from 'src/app/shared/models/user';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  course:Observable<Course | undefined>;
  lectures:Observable<Lecture[] | undefined>;
  owner:Observable<User | undefined>;
  sortedLectures: Lecture[];

  cid:string;
  courseTitle:string='Lecture Videos';

  //For the upload video dialog box
  showDialog:boolean=false;
  alert:string;
  title:string;
  description:string;
  thumbnailFile:File;
  videoFile:File;
  
  constructor(public router: Router, private activatedRoute:ActivatedRoute, public auth:AuthService, public db:DatabaseService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.cid=params['cid'];
    });
  }

  ngOnInit(): void {
    this.course = this.db.getCourse(this.cid)
    this.lectures = this.db.getCourseLectures(this.cid);
    this.lectures.subscribe(lectures => {
      this.sortedLectures = lectures?.sort((a, b) => b.uploadDate.seconds - a.uploadDate.seconds)!;
    });
    this.course.subscribe((course)=> this.owner = this.db.getUser(course?.owner));
  }


  toggleDialog(){
    this.showDialog = !this.showDialog; 
  }

  videoSelected(event: any) {
    this.videoFile = event.target.files[0];
  }

  imageSelected(event: any) {
    this.thumbnailFile = event.target.files[0];
  }

  
  navigateToLecture(lecture: Lecture){
    let navigationExtras:NavigationExtras = {
      queryParams: {
        cid: lecture.courseID,
        lid: lecture.id
      }
    }
    this.router.navigate(['/lecture/'], navigationExtras);
  }

  uploadLecture(){
    if (!this.videoFile) {
      this.alert = 'Invalid form entry';
      return;
    }

    this.auth.user$.subscribe( async user => {
      if(user?.role === 'Teacher') {
        let timestamp = new Timestamp(Date.now()/1000, 0);
        let lecture:Lecture = {
          id: '',
          courseID: this.cid,
          description: this.description,
          ownerID: user.id,
          thumbnailUrl:'',
          title: this.title,
          uploadDate: timestamp,
          videoUrl: ''
        }  

        await this.db.createLecture(lecture, this.cid, this.thumbnailFile, this.videoFile)
        .catch(() => {
          this.alert = 'Invalid form entry';
          this.toggleDialog();
        });
        this.toggleDialog();
      }
    });
  }
}