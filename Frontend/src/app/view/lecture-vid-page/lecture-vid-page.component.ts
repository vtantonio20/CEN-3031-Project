import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './../../shared/database/database.service';
import { AuthService } from './../../shared/auth/auth.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { Lecture } from 'src/app/shared/models/lecture';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Time } from '@angular/common';

@Component({
  selector: 'app-lecture-vid-page',
  templateUrl: './lecture-vid-page.component.html',
  styleUrls: ['./lecture-vid-page.component.css']
})



export class LectureVidPageComponent implements OnInit {


  headerTitle:string = 'Lecture';



  currentTime: Time;
  src: string;

  cid: string;
  lid: string;
  course: Observable<Course | undefined>;
  lecture: Observable<Lecture | undefined>;

  showChat:boolean = true;
  videoDescription = "";
  videoTitle = "";
  autoplay:boolean=false;
  
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
      }
    });
  }

  hideLiveChat(){
    this.showChat = !this.showChat; 
    if(this.currentTime != undefined){
      this.autoplay=true;
    }
    //also add code to detect if the video is pause and to not autoplay if so


    // alert("hide chat triggered... ");
  }

  /*
  pause(event: any){
    console.log(event)
    if(event.type == 'pause'){
      this.autoplay=false;
    }
  }*/
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

}


