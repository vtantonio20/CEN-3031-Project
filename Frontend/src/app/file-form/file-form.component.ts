import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {

  file: File;
  upload$: Observable<any>;
  src: string = environment.firebase.storageBucket;
  clicked: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  fileSelected(event: any) {
    this.file = event.target.files[0];
    console.log('file selected');

  }

  uploadData() {
    if (!this.file) {
      return;
    }
    if (this.clicked) {
      return
    } else {
      this.clicked = true;
    }
    const formData = new FormData();
    formData.append("video", this.file);
    this.upload$ = this.http.post("http://localhost:3000/uploadVideo", formData);
    // This subrscibe creates multiple requests so don't use it.
    //this.upload$.subscribe(url => {
    //  console.log(url);
    //});
  }

  hello() {
    this.http.get("http://localhost:3000/").subscribe(hello => {console.log(hello);});
  }

}
