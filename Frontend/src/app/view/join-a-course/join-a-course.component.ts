import { AuthService } from './../../shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/shared/database/database.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-join-a-course',
  templateUrl: './join-a-course.component.html',
  styleUrls: ['./join-a-course.component.css']
})
export class JoinACourseComponent implements OnInit {

  courseID:string;
  constructor(private router: Router, public auth: AuthService, public db: DatabaseService) {  }

  loggedIn(){
    return true;
  }
  ngOnInit(){

  }
}
