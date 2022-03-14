import { AuthService } from './../../shared/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user/user';
import { filter, map, of, tap } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: []
})
export class HeaderComponent implements OnInit {

  onProfile:boolean =false;
  //user:User;
  constructor(public auth: AuthService) {

  }

  ngOnInit(): void {
  }

  //name(){
  //  //let u = this.auth.user;
  //  if(this.auth.currentUser){
  //    return this.auth.currentUser.fname;
  //  }else{
  //    return '';
  //  }
  //}
  //role(){
  //  //let u = this.auth.user;
  //  if(this.auth.currentUser){
  //    return this.auth.currentUser.role;
  //  }else{
  //    return '';
  //  }
  //}

  toggleProfileCard():void{
    this.onProfile = !this.onProfile;
  }

  logout() {
    this.auth.logout();
  }

}
