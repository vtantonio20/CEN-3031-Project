import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.css']
})
export class CoursePageComponent implements OnInit {

  courseName: string="Computer Program 1"
  constructor() { }

  ngOnInit(): void {
  }

}
