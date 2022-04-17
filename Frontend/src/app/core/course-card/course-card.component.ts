import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './../../shared/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  
  @Input() role: string;
  @Input() course: Course; 
  imgSrc:string;
  constructor(private storage: AngularFireStorage) { 

  }

  ngOnInit(): void {  }
  

}
