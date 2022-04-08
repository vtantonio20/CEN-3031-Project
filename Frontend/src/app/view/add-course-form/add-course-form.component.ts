import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { DatabaseService } from 'src/app/shared/database/database.service';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.css']
})
export class AddCourseFormComponent implements OnInit {

  courseName: string;
  imageURL: string;
  navElements:string[]= ['Dashboard', 'Create a Course'];
  alert:string;
  constructor(public auth:AuthService, public db:DatabaseService, private router:Router) { }

  ngOnInit(): void {
  }

  navigation(linkTo:string){
    if(linkTo === 'Dashboard') return this.router.navigate(['/dashboard']);
    if(linkTo === 'Create a Course') return location.reload;
    return;
  }

  addCourse() {
    this.auth.user$.subscribe(user =>{
      //imageURL = uploadImage(imageBlob)

      let course: Course = {
        id:'',  
        imgUrl: '',
        title: this.courseName,
        owner: user?.id!,
        students: [],
        lectures: []
      }
      this.db.createCourse(course).then(() => {
        this.router.navigate(['/dashboard']);
      }).catch(()=> {
        this.alert = 'Invalid form entry'
      })
    })
  }

  openDialog()
  {
    
  }

  uploadImage()
  {
    
  }

}
