import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  async canActivate() {
    const loggedIn = await this.auth.isLoggedIn();

    if (loggedIn) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }

}
