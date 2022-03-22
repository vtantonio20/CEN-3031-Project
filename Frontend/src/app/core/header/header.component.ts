import { AuthService } from './../../shared/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() title:String;
  constructor(public auth: AuthService) {

  }

  ngOnInit(): void {
  }

  toggleProfileCard():void{
    this.onProfile = !this.onProfile;
  }

  logout() {
    this.auth.logout();
  }

}
