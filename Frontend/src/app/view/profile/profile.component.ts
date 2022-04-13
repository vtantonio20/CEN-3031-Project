import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { DatabaseService } from 'src/app/shared/database/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  fname: string;
  lname: string;
  img: File;

  fEdit: boolean = false;
  lEdit: boolean = false;

  constructor(public auth: AuthService, private db: DatabaseService, private router: Router) { }

  ngOnInit(): void {
  }

  navDash() {
    this.router.navigate(['/dashboard']);
  }

  fileSelected(event: any) {
    this.img = event.target.files[0];
  }

  edit(uid: string, fname: string, lname: string) {
    this.db.editUser(uid, fname, lname, this.img);
  }

}
