import { AuthService } from './../../shared/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  directTo:string;
  alert: string; //bool, msg

  email:string;
  password:string;
  constructor(private router: Router, private http: HttpClient, private auth: AuthService){

  }

  ngOnInit(): void {
  }

  login(){
    this.auth.login(this.email, this.password)
    .catch(()=>{
      this.alert='Invalid Email or Password';
    });
  }

  ngOnChanges(): void {
  }


}
