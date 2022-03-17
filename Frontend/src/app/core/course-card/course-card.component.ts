import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';
@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  @Input() course1: Course; 
  constructor() { }

  ngOnInit(): void {
  }
  

}
