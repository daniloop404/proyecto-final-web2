import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = this.loginService.isAuthenticated();

    if (isAuthenticated) {
      // If user is already authenticated, redirect to home or another page
      this.router.navigate(['/']); // You can change this to the desired redirect route
      return false;
    } else {
      // Allow access for unauthenticated users
      return true;
    }
  }
}