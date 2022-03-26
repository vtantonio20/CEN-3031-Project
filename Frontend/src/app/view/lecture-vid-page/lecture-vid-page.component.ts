import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './../../shared/database/database.service';
import { AuthService } from './../../shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
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

  lecture: Observable<Lecture | undefined>;
  currentTime: Time;
  src: string;
  lid: string;
  hideDiv = false;
  videoDescription = "";
  videoTitle = "";
  
  constructor(private activatedRoute: ActivatedRoute, private db: DatabaseService, public storage: AngularFireStorage) {
    this.videoDescription = "This is a sample description of what a teacher might type when they add a lecture video to a course... ";
    this.videoTitle = "CAP 3100";
    if (this.activatedRoute.queryParams) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.lid=params['lid'];
      });
    }
   }

  ngOnInit(): void {
    this.hideDiv = false;
    this.lecture = this.db.getLecture(this.lid);
    this.lecture.subscribe(lecture => {
      if (lecture) {
        this.storage.ref(lecture?.videoUrl!).getDownloadURL().subscribe(url => {
          this.src = url;
        });
      }
    });
  }

   hideLiveChat(){
    this.hideDiv = !this.hideDiv; 
    // alert("hide chat triggered... ");
    return this.hideDiv; 
  }

  time(event: any) {
    // console.log(event);
    
    this.currentTime = event.target.currentTime;
  }

}


