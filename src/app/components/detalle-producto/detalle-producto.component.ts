import { Component, OnInit } from '@angular/core';
import { CelularesService } from 'src/app/services/celulares.service';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})

export class DetalleProductoComponent implements OnInit {

  celular: {
    marca: string;
    modelo: string;
    precio: number;
    imagen_url: string;
    lanzamiento: number;
    pantalla: { tipo: string; tamano: number };
    camara_principal: { resolucion: string; apertura: string };
    bateria: number;
    almacenamiento: number;
    key?: string; // Add the key property
  } = {
    marca: '',
    modelo: '',
    precio: 0,
    imagen_url: '',
    lanzamiento: 0,
    pantalla: { tipo: '', tamano: 0 },
    camara_principal: { resolucion: '', apertura: '' },
    bateria: 0,
    almacenamiento: 0
  };

  constructor(public loginService: LoginService, private celularesService: CelularesService, private route: ActivatedRoute, private carrito: CarritoService) { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.celularesService.getCelulares().subscribe(celulares => {
        const celular = celulares.find(c => c.key === key);
        if (celular) {
          // Assign the key property
          this.celular = { ...celular, key: celular.key ?? '' }; // Use '' or another default value
        }
      });
    }
  }
  
  comprar() {
    const userKey = this.loginService.getUserKey() ?? 'defaultUserKey';
  
    // Make sure to replace 'celularkey' with the actual key property you are using for the celular
    const celularKey = this.celular.key ?? ''; // Provide a default value
  
    // Create a new object with only the properties needed for the service
    const celularForService = {
      marca: this.celular.marca,
      modelo: this.celular.modelo,
      precio: this.celular.precio
    };
  
    this.carrito.agregarAlCarrito(celularForService, userKey, celularKey).subscribe();
  }
}