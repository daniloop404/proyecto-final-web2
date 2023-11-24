import { Component } from '@angular/core';
import { CelularesService } from 'src/app/services/celulares.service';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent {
  celularKey: string | null = null; // Define celularKey here
  dataCelulares: { [key: string]: any, confirmar: boolean }[] = [];
  //confirmar: boolean = false;
  indexNumber:any;
  constructor(private servicio: CelularesService, private router: Router) {}

  
  confirmarEliminar(celular:any) {
    //this.confirmar = !this.confirmar;
    celular.confirmar = !celular.confirmar;

  }

  ngOnInit() {
    this.servicio.getCelulares().subscribe((datos: Record<string, any>) => {
      this.dataCelulares = Object.entries(datos).map(([key, value]) => ({ key, ...value }));
    });
  }

  
  onDelete(celularKey: string | null): void {
    if (celularKey) {
      this.servicio.deleteCelular(celularKey).subscribe(
        (response) => {
          console.log('Celular deleted successfully:', response);
          // Add any additional logic or redirection after a successful delete
          window.location.reload();
        },
        (error) => {
          console.error('Error deleting celular:', error);
          // Handle error
        }
      );
    } else {
      console.warn('Cannot delete, celularKey is null.');
      // Handle the case where celularKey is null
    }
  }
}