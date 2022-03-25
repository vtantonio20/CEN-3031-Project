import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {

  @ViewChild('target', {static: true}) target: HTMLMediaElement;

  file: File;
  upload$: Observable<any>;
  src: string;

  constructor(private http: HttpClient, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.storage.ref('manual/master.m3u8').getDownloadURL().subscribe(url => {
      console.log(url);

      this.src = url;
      //if (Hls.isSupported()) {
      //  var hls = new Hls();
      //  hls.loadSource(this.src);
      //  hls.attachMedia(this.target);
      //}
    });
  }

  fileSelected(event: any) {
    this.file = event.target.files[0];
    console.log('file selected');

  }

  uploadData() {
    if (!this.file) {
      return;
    }

    console.log('Tried to send');


    const formData = new FormData();
    formData.append("video", this.file);
    this.upload$ = this.http.post("http://localhost:3000/uploadVideo", formData);
    // This subrscibe creates multiple requests so don't use it.
    this.upload$.subscribe(url => {
      console.log(url);
    });
  }

  hello() {
    this.http.get("http://localhost:3000/").subscribe(hello => {console.log(hello);});
  }

}
