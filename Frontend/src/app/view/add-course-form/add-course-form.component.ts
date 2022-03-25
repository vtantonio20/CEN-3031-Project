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
  headerTitle:string='Create a course'
  alert:string;
  constructor(public auth:AuthService, public db:DatabaseService, private router:Router) { }

  ngOnInit(): void {
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
