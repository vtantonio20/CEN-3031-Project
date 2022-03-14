import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//Dependency Injection
export class AppComponent {
  //Imagine if AppComponent needs TestServiceService
  // Do not need to create instance of service


  constructor( private auth: AuthService){
  }

  ngOnInit(){
    //this.auth.intialize();
  }

  print():void{

  }


}
