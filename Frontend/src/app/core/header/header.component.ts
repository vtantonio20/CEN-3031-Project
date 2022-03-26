import { AuthService } from './../../shared/auth/auth.service';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: []
})
export class HeaderComponent implements OnInit {

  onProfile:boolean = false;
  //user:User;
  @Input() title:String;
  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleProfileCard():void{
    this.onProfile = !this.onProfile;
  }

  logout() {
    this.auth.logout();
  }

}
