// registro.component.ts
import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nuevoUsuario = {
    nombreUsuario: '',
    clave: '',
    rol: 'usuario',
    nombre: '',
    direccion: '',
    telefono: '',
    correo: ''
  };

  usernameExists = false;
  emailExists = false;

  // Inject the Router service in the constructor
  constructor(private usuariosService: UsuariosService, private router: Router) {}

  onSubmit() {
    // Check if the form is valid and if both username and email are unique
    if (!this.usernameExists && !this.emailExists) {
      this.usuariosService.postUsuario(this.nuevoUsuario).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);

          // Show success message to the user
          alert('Usuario registrado exitosamente, ahora puedes iniciar sesión');

          // Optionally, you can reset the form here
          // this.nuevoUsuario = { nombreUsuario: '', clave: '', rol: '', nombre: '', direccion: '', telefono: '', correo: '' };

          // Redirect to the login page
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
        }
      );
    }
  }

  checkUsername() {
    console.log('Checking username:', this.nuevoUsuario.nombreUsuario);
    this.usuariosService.checkUsernameExists(this.nuevoUsuario.nombreUsuario).subscribe(
      (exists) => {
        console.log('Username exists:', exists);
        this.usernameExists = exists;
      },
      (error) => {
        console.error('Error checking username:', error);
      }
    );
  }
  
  checkEmail() {
    console.log('Checking email:', this.nuevoUsuario.correo);
    this.usuariosService.checkEmailExists(this.nuevoUsuario.correo).subscribe(
      (exists) => {
        console.log('Email exists:', exists);
        this.emailExists = exists;
      },
      (error) => {
        console.error('Error checking email:', error);
      }
    );
  }
}