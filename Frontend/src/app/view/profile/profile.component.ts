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

  eDialog: boolean = false;
  pDialog: boolean = false;
  dDialog: boolean = false;

  alert: string;
  password: string;
  newEmail: string;
  newPassword: string;

  constructor(public auth: AuthService, private db: DatabaseService, private router: Router) { }

  ngOnInit(): void {
  }

  toggleEmail() {
    this.eDialog = !this.eDialog;
    this.alert = '';
    this.password = '';
  }

  async updateEmail(email: string) {
    await this.auth.updateEmail(email, this.password, this.newEmail)
    .then(message => {
      this.alert = message;
    })
    .catch(message => {
      console.log(message, 'catch');
      this.toggleEmail();
    });
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
