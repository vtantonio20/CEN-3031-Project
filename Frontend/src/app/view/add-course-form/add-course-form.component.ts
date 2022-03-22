import { Component, OnInit } from '@angular/core';
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
  

  constructor(public auth:AuthService, public db:DatabaseService) { }

  ngOnInit(): void {
  }

  addCourse() 
  {
    this.auth.user$.subscribe(user =>{
      //imageURL = uploadImage(imageBlob)

      let course: Course = {
        imgUrl: '',
        title: this.courseName,
        owner: user?.id!,
        students: [],
        lectures: []
      }

      this.db.createCourse(course) 
    })
  }

  openDialog()
  {
    
  }

  uploadImage()
  {
    
  }

}
