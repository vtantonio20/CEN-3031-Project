import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-course-form',
  templateUrl: './add-course-form.component.html',
  styleUrls: ['./add-course-form.component.css']
})
export class AddCourseFormComponent implements OnInit {

  courseName: string;
  imageURL: string;
  

  constructor() { }

  ngOnInit(): void {
  }

  addCourse() 
  {
    //this.auth.user$.subscribe(user =>{
      //imgURL = uploadImage(imageBlob)

      //let course: Course = {
      //  imgUrl: imgURl,
      //  title: 'form data',
      //  owner: user?.id,
      //  students: [],
      //  lectures: []
      //}

      //this.createCourse(course) 
    //})
  }

  uploadImg()
  {
    
  }

}
