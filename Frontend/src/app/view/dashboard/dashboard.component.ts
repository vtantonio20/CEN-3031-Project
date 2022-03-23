import { Observable } from 'rxjs';
import { DatabaseService } from './../../shared/database/database.service';
import { AuthService } from './../../shared/auth/auth.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  //template: '<button class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" (click)="toggleDialog()">',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  courseID:string;
  showDialog:boolean=false;
  alert:string="";
  
  courses:Observable<Course[]>;
  headerTitle:string='Dashboard';
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
  redirect(){
    
  }

  toggleDialog(){
    this.showDialog = !this.showDialog; 
  }

  async addStudentToCourse(){
    this.auth.user$.subscribe(user => {
      if(user?.role === 'Student'){
        this.db.addStudent(this.courseID, user?.id).then(() => {
          this.courseID="";
          this.alert="";
          this.toggleDialog()
        }).catch(e => {
          this.alert="Invalid Course ID"
        })
      }
    })
  }

}
