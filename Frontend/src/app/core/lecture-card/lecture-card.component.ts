import { Lecture } from './../../shared/models/lecture';
import { Component, Input, OnInit, Type } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lecture-card',
  templateUrl: './lecture-card.component.html',
  styleUrls: ['./lecture-card.component.css']
})
export class LectureCardComponent implements OnInit {

  //@Input() owner:string;
  //@Input() title:string;
  //@Input() uploadDate:string;

  date: string;

  @Input() owner:string;
  @Input() lecture:Lecture;
  constructor() { }

  ngOnInit(): void {
    this.date = new Date(this.lecture.uploadDate.seconds * 1000).toLocaleDateString('en-us');
  }

}
