import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = this.loginService.isAuthenticated();
  
    if (isAuthenticated) {
      // Check the user's role and allow access based on roles
      const userRole = this.loginService.getRole();
  
      if (userRole) {
        // Allow access to administrador-specific routes
        return true;
      } else {
        // Redirect to the login page for other roles or users without a role
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // Redirect to the login page if not authenticated
      this.router.navigate(['/login']);
      return false;
    }
  }
}