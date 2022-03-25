import { Lecture } from './../../shared/models/lecture';
import { Component, Input, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-lecture-card',
  templateUrl: './lecture-card.component.html',
  styleUrls: ['./lecture-card.component.css']
})
export class LectureCardComponent implements OnInit {

  //@Input() owner:string;
  //@Input() title:string;
  //@Input() uploadDate:string;

  @Input() owner:string;
  @Input() lecture:Lecture;
  constructor() { }

  ngOnInit(): void {
  }

}
