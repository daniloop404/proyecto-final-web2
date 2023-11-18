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

  // Inject the Router service in the constructor
  constructor(private usuariosService: UsuariosService, private router: Router) {}

  onSubmit() {
    this.usuariosService.postUsuario(this.nuevoUsuario).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);

        // Show success message to the user
        alert('Usuario registrado exitosamente, ahora puedes iniciar sesion');

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