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
    this.auth.login(this.email, this.password);
    //.then(() => {
    //  if(this.auth.authenticated === true){
    //    this.router.navigate(['/dashboard'])
    //  }
    //}).catch((error) =>{
    //  console.log(error.message);
    //  this.alert='Invalid Email or Password';
    //})
  }


  search(){
    /*let obs = this.http.get('https://api.github.com/users/' + this.userName);
    obs.subscribe((response) => {
      this.response=response;
      console.log(this.response);
    });*/
  }
  ngOnChanges(): void {
  }


}
