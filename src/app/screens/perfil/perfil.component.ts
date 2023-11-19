import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuarioKey: string | null = null;
  usuario: any; // Update the type based on your user data structure
  isEditing = false;
  editedUsuario: any; // This will hold the changes made in the form

  constructor(private usuariosService: UsuariosService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.usuarioKey = this.loginService.getUserKey();

    if (this.usuarioKey) {
      this.usuariosService.getUsuarioPorId(this.usuarioKey).subscribe(
        (usuario: any) => {
          this.usuario = usuario;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    }
  }

  modificarDatos(): void {
    this.isEditing = true;
    // Create a copy of the user data for editing
    this.editedUsuario = { ...this.usuario };
  }

  cancelarEdicion(): void {
    this.isEditing = false;
    this.editedUsuario = null;
  }

  guardarCambios(): void {
    if (this.editedUsuario) {
      this.usuariosService.putUsuario(this.usuarioKey!, this.editedUsuario).subscribe(
        (response) => {
          // Update the displayed user information
          this.usuario = this.editedUsuario;
          this.isEditing = false;
        },
        (error) => {
          console.error('Error updating user data:', error);
        }
      );
    }
  }
}