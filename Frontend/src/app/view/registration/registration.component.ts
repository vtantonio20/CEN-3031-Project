import { AuthService } from './../../shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  email:string;
  fname:string;
  lname:string;
  password:string;
  cpassword:string;
  role:string;

  alert:string;

  constructor(private router:Router, private auth : AuthService) { }

  //Create operation here
  ngOnInit(): void {
    /*this.auth.register(this.email, this.fname, this.password).then(() => {
      this.router.navigate(['/dashboard'])
    }).catch((error) =>{
      console.log(error.message);
      this.alert='Invalid Email or Password';
    })*/
  }

  register() {
    if(this.password === this.cpassword){
      this.auth.register(this.email, this.fname, this.lname, this.password, this.role).then(() => {
        this.router.navigate(['/dashboard']);
      }).catch(() => {
        this.alert = "Invalid Entry"
      });
    }else{
      this.alert='Make sure passwords match!';
    }
    
  }
  redirect(){
    this.router.navigate(['/home']);
  }

}
