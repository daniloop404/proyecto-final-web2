import { Component, OnInit } from '@angular/core';
import { CelularesService } from 'src/app/services/celulares.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-formulario-celular',
  templateUrl: './formulario-celular.component.html',
  styleUrls: ['./formulario-celular.component.css']
})
export class FormularioCelularComponent implements OnInit {
  celular: any;
  celularKey: string | null = null;

  celularData = {
    marca: '',
    modelo: '',
    lanzamiento: null,
    pantalla: {
      tipo: '',
      tamano: null,
    },
    camara_principal: {
      resolucion: '',
      apertura: '',
    },
    bateria: null,
    almacenamiento: null,
    precio: null,
    imagen_url: '',
  };

  constructor(
    private celularesService: CelularesService,
    private route: ActivatedRoute,
    private router: Router
    
  ) {}

  ngOnInit() {
    this.celularKey = this.route.snapshot.paramMap.get('key');

    if (this.celularKey) {
      this.celularesService.getCelularPorId(this.celularKey).subscribe(
        (celular) => {
          this.celular = celular;
          this.populateForm();
        },
        (error) => {
          console.error('Error fetching existing celular:', error);
          // Handle error
        }
      );
    }
  }

  populateForm() {
    // Populate the form based on the existing celular data
    this.celularData = {
      marca: this.celular.marca || '',
      modelo: this.celular.modelo || '',
      lanzamiento: this.celular.lanzamiento || null,
      pantalla: {
        tipo: this.celular.pantalla?.tipo || '',
        tamano: this.celular.pantalla?.tamano || null,
      },
      camara_principal: {
        resolucion: this.celular.camara_principal?.resolucion || '',
        apertura: this.celular.camara_principal?.apertura || '',
      },
      bateria: this.celular.bateria || null,
      almacenamiento: this.celular.almacenamiento || null,
      precio: this.celular.precio || null,
      imagen_url: this.celular.imagen_url || '',
    };
  }

  onSubmit(): void {
    // Your existing onSubmit logic here
    if (this.celular) {
      // Modify existing celular logic
      this.celularesService.updateCelular(this.celularKey!, this.celularData).subscribe(
        (response) => {
          console.log('Celular updated successfully:', response);
          // Add any additional logic or redirection after a successful update
          this.router.navigate(['/administracion']);
         
        },
        (error) => {
          console.error('Error updating celular:', error);
          // Handle error
        }
      );
    } else {
      // Add new celular logic
      this.celularesService.postCelular(this.celularData).subscribe(
        (response) => {
          console.log('Celular added successfully:', response);
          this.router.navigate(['/administracion'])
        },
        (error) => {
          console.error('Error adding celular:', error);
          // Handle error
        }
      );
    }
  }

  private validateForm(): boolean {
    // Your existing validation logic here
    return true;
  }
}