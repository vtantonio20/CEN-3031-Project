import { DatabaseService } from 'src/app/shared/database/database.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursePageGuardGuard implements CanActivate {
  constructor(private auth: AuthService, private db: DatabaseService, private router: Router) {}


  async canActivate() {
    const loggedIn = await this.auth.isLoggedIn();
    
    if (!loggedIn) {
      this.router.navigate(['/home']);
      return false;
    }

    let courses:Observable<Course[]>;
    this.auth.user$.subscribe(u => {
      let uid= u?.id;
      courses=this.db.getStudentCourses(uid);
      
      
    })


    return true;

  }
  
}
