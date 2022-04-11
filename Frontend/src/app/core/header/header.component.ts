import { AuthService } from './../../shared/auth/auth.service';
import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
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
  @Input() navigation:string[];
  @Output() clickEvent = new EventEmitter<string>();

  constructor(public auth: AuthService, private router: Router) { }

  ngOnInit(): void { }

  toggleProfileCard():void{
    this.onProfile = !this.onProfile;
  }

  navProfile() {
    this.router.navigate(['/profile']);
  }

  logout() {
    this.auth.logout();
  }

  clickedNav(value: string) {
    this.clickEvent.emit(value);
  }

  mobileBack(){
    if(this.navigation[this.navigation.length-1] === 'Lecture') return this.clickEvent.emit('Course Page')
    if(this.navigation[this.navigation.length-1] === 'Course Page') return this.clickEvent.emit('Dashboard')
    return this.clickEvent.emit('Dashboard')
  }
}
