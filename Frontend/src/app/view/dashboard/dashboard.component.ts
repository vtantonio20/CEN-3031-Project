import { AuthService } from './../../shared/auth/auth.service';
import { User } from './../../shared/user/user';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CourseCard } from 'src/app/core/course-card/course-card-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 // user:User;
  course:CourseCard = new CourseCard;

  constructor(private router: Router, private auth: AuthService) { 
    //this.user = this.router.getCurrentNavigation()?.extras?.state?.['user'];

    //this.userService = this.router.getCurrentNavigation()?.extras?.state?.['userSvc'];
    
    /*this.userSvc.currentUser.subscribe(user => {
      this.user = user;
      console.log(user.email+ '\n' + user.id + '\n'+ user.name+ '\n' + user.password + '\n' + user.type)
    })*/

    //this.user=this.userService.user;
  }

  //here we will return the courses
  courses(){

  }
  role(){
    //let u = this.auth.user;
    if(this.auth.currentUser){
      return this.auth.currentUser.role;
    }else{
      return '';
    }
  }
  loggedIn(){
    return true;
  }
  ngOnInit(): void {
    this.course.name="Computer Science 1";
    this.course.teacher="John Proffesor Guy";
  }

}
