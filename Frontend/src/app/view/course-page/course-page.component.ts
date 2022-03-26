import { DatabaseService } from 'src/app/shared/database/database.service';
import { AuthService } from './../../shared/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Course } from 'src/app/shared/models/course';
import { Lecture } from 'src/app/shared/models/lecture';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {
  course:Observable<Course | undefined>;
  lectures:Observable<Lecture[]>;
  owner:Observable<User | undefined>;

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
    this.course.subscribe((course)=> this.owner = this.db.getUser(course?.owner)) 
  }


  toggleDialog(){
    this.showDialog = !this.showDialog; 
  }

  
  navigateToLecture(lecture: Lecture){
    let navigationExtras:NavigationExtras = {
      queryParams: {
        lid: lecture.id
      }
    }
    this.router.navigate(['/lecture/'], navigationExtras);
  }

  async uploadLecture(){
    this.auth.user$.subscribe(user => {
      if(user?.role === 'Teacher'){
        let lecture:Lecture = {
          id: '',
          courseID: this.cid,
          description: this.description,
          ownerID: user.id,
          thumbnailUrl:'',
          title: this.title,
          uploadDate: new Date(),
          videoUrl: ''
        }      
        this.db.createLecture(lecture).then((l) => {
          this.router.navigate(['/dashboard/']);
        }).catch(()=> {
          this.alert = 'Invalid form entry'
        })
      }
    })
  }
}
