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

  constructor(){
  }

  ngOnInit(){ }

  print():void{

  }


}
