import { Observable } from 'rxjs';
import { DatabaseService } from './../../shared/database/database.service';
import { AuthService } from './../../shared/auth/auth.service';
import { NavigationExtras, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  headerTitle:string='Dashboard';
  navElements:string[]= ['Dashboard']

  courseID:string;
  showDialog:boolean=false;
  alert:string;
  
  courses:Observable<Course[]>;
  constructor(private router: Router, public auth: AuthService, public db: DatabaseService) { }
  
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

  toggleDialog(){
    this.showDialog = !this.showDialog; 
  }

  navigation(linkTo:string){
    console.log(linkTo)
    if(linkTo === 'Dashboard') return location.reload();
    return;
  }

  async addStudentToCourse(){
    this.auth.user$.subscribe(user => {
      if(user?.role === 'Student'){
        this.db.addStudent(this.courseID, user?.id).then(() => {
          this.courseID="";
          this.alert="";
          this.toggleDialog()
        }).catch(() => {
          this.alert="Invalid Course ID"
        })
      }
    })
  }

  navigateToCourse(course:Course){
    let navigationExtras:NavigationExtras = {
      queryParams: {
        cid:course.id 
      }
    }
    this.router.navigate(['/course-page/'], navigationExtras);
  }
  
}
