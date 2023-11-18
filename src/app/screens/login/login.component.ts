import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Add this variable

  constructor(private loginService: LoginService, private router: Router) { }

  onSubmit(): void {
    // Call the login method from the service
    this.loginService.login(this.username, this.password).subscribe((success) => {
      if (success) {
        // Redirect based on the user's role
        const userRole = this.loginService.getRole();
        if (userRole === 'usuario') {
          // Redirect to usuario-specific route
          this.router.navigate(['/']);
        } else if (userRole === 'administrador') {
          this.router.navigate(['/']);
          // Redirect to administrador-specific route
        }
      } else {
        // Handle login failure
        this.errorMessage = 'Usuario o contraseña incorrecto'; // Set the error message
        console.log('Login failed');
      }
    });
  }
}