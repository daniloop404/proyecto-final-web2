import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  nuevoUsuario = {
    nombreUsuario: '',
    clave: '',  // Initialize to an empty string
    rol: 'usuario',
    nombre: '',
    direccion: '',
    telefono: '',
    correo: ''
  };

  constructor(private usuariosService: UsuariosService) {}

  onSubmit() {
    // Call the service method to post the user
    this.usuariosService.postUsuario(this.nuevoUsuario).subscribe(
      (response) => {
        console.log('Usuario registrado:', response);
        // Optionally, you can reset the form here
        // this.nuevoUsuario = { nombreUsuario: '', clave: '', rol: '', nombre: '', direccion: '', telefono: '', correo: '' };
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
      }
    );
  }
}