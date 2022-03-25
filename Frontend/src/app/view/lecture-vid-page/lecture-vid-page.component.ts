import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './../../shared/database/database.service';
import { AuthService } from './../../shared/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';
import { Lecture } from 'src/app/shared/models/lecture';

@Component({
  selector: 'app-lecture-vid-page',
  templateUrl: './lecture-vid-page.component.html',
  styleUrls: ['./lecture-vid-page.component.css']
})



export class LectureVidPageComponent implements OnInit {

  lecture: Observable<Lecture | undefined>;

  lid: string;
  hideDiv = false;
  videoDescription = "";
  videoTitle = "";
  
  constructor(private activatedRoute: ActivatedRoute, private db: DatabaseService) {
    this.videoDescription = "This is a sample description of what a teacher might type when they add a lecture video to a course... ";
    this.videoTitle = "CAP 3100";

    this.activatedRoute.queryParams.subscribe(params => {
      this.lid=params['lid'];
    });
   }

  ngOnInit(): void {
    this.hideDiv = false;
    this.lecture = this.db.getLecture(this.lid);
  }

   hideLiveChat(){
    this.hideDiv = !this.hideDiv; 
    alert("hide chat triggered... ");
    return this.hideDiv; 
  }

}


