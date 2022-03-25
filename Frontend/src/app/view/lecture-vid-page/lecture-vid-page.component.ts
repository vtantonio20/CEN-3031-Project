import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatabaseService } from './../../shared/database/database.service';
import { AuthService } from './../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-lecture-vid-page',
  templateUrl: './lecture-vid-page.component.html',
  styleUrls: ['./lecture-vid-page.component.css']
})



export class LectureVidPageComponent implements OnInit {

  hideDiv = false;
  videoDescription = "";
  videoTitle = "";
  
  constructor() {
    this.videoDescription = "This is a sample description of what a teacher might type when they add a lecture video to a course... ";
    this.videoTitle = "CAP 3100";
   }

  ngOnInit(): void {
    this.hideDiv = false; 
  }

   hideLiveChat(){
    this.hideDiv = !this.hideDiv; 
    alert("hide chat triggered... ");
    return this.hideDiv; 
  }

}


