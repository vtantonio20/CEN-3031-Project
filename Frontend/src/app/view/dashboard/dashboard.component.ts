import { Observable } from 'rxjs';
import { DatabaseService } from './../../shared/database/database.service';
import { AuthService } from './../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CourseCard } from 'src/app/core/course-card/course-card-model';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  courses:Observable<Course[]>;
  constructor(private router: Router, public auth: AuthService, public db: DatabaseService) {  }
  
  loggedIn(){
    return true;
  }
  ngOnInit(){
    this.auth.isLoggedIn().then((user)=>{
      if(user?.role=='Teacher'){
        this.courses = this.db.getTeacherCourses(user?.id)
      }else if(user?.role=='Student'){
        this.courses=this.db.getStudentCourses(user?.id);
      }
    })
  }

}
