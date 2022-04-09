import { link } from 'fs';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './../../shared/database/database.service';
import { AuthService } from './../../shared/auth/auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { Lecture } from 'src/app/shared/models/lecture';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Time } from '@angular/common';
import { User } from 'src/app/shared/models/user';
import { Thread } from 'src/app/shared/models/thread';

@Component({
  selector: 'app-lecture-vid-page',
  templateUrl: './lecture-vid-page.component.html',
  styleUrls: ['./lecture-vid-page.component.css']
})



export class LectureVidPageComponent implements OnInit {

  //navigatiom
  navElements:string[] = ['Dashboard', 'Course Page', 'Lecture'];
  cid: string;
  lid: string;

  //Time
  currentTime: Time;
  src: string;
  date:string;


  //Page elements
  course: Observable<Course | undefined>;
  lecture: Observable<Lecture | undefined>;
  owner:Observable<User | undefined>;
  
  //Chat box stuff
  showChat:boolean = true;
  videoDescription = "";
  videoTitle = "";
  threads: Observable<Thread[] | undefined>;
  
  constructor(public router: Router, private activatedRoute: ActivatedRoute, private db: DatabaseService, public storage: AngularFireStorage, public auth:AuthService) {
    if (this.activatedRoute.queryParams) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.cid=params['cid'];
        this.lid=params['lid'];
      });
    }
   }

   

  ngOnInit(): void {
    this.lecture = this.db.getLecture(this.lid);
    this.lecture.subscribe(lecture => {
      if (lecture) {
        this.course = this.db.getCourse(lecture.courseID)
        this.storage.ref(lecture?.videoUrl!).getDownloadURL().subscribe(url => {
          this.src = url;
        });
        this.course.subscribe((course)=> this.owner = this.db.getUser(course?.owner));
        this.date = new Date(lecture.uploadDate.seconds * 1000).toLocaleDateString('en-us');
      }
    });
  }
  navigation(linkTo:string){
    if(linkTo === 'Dashboard') return this.router.navigate(['/dashboard/']);
    if(linkTo === 'Course Page') return this.navigateBackToCourse();
    if(linkTo === 'Lecture') return location.reload();
    return;
  }
  toggleChat(){
    this.showChat = !this.showChat; 
  }
  
  time(event: any) {
    this.currentTime = event.target.currentTime;
    
  }

  
  navigateBackToCourse(){
    let navigationExtras:NavigationExtras = {
      queryParams: {
        cid:this.cid 
      }
    }
    this.router.navigate(['/course-page/'], navigationExtras);
  }


  getThreads(){
    this.threads = this.db.getLectureThreads(this?.lid); 
    this.threads.subscribe(thread => {
      if (thread){
        console.log( thread[0].message);
      }
    })
  }

}


