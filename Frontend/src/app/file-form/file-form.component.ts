import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  file: File;

  fileSelected(event: any) {
    this.file = event.target.files[0];
    console.log('file selected');
    
  }

  uploadData() {
    if (!this.file) {
      return;
    }
    const formData = new FormData();
    formData.append("video", this.file);
    let upload$ = this.http.post("http://localhost:3000/uploadVideo", formData);
    upload$.subscribe(res => {
      console.log(res);
    });
  }

  hello() {
    this.http.get("http://localhost:3000/").subscribe(snap => {
      console.log(snap);
    })
  }

}
