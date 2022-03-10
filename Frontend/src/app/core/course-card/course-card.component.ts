import { Component, Input, OnInit } from '@angular/core';
import { CourseCard } from './course-card-model';
@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  constructor() { }

  @Input() course:CourseCard;
  ngOnInit(): void {
  }
  

}
