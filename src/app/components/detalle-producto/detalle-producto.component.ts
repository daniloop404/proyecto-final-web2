import { Component, OnInit } from '@angular/core';
import { CelularesService } from 'src/app/services/celulares.service';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})

export class DetalleProductoComponent implements OnInit {
  isAdmind:Boolean=false;

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
    key?: string;
    unidades: number; // Add the key property
  } = {
    marca: '',
    modelo: '',
    precio: 0,
    imagen_url: '',
    lanzamiento: 0,
    pantalla: { tipo: '', tamano: 0 },
    camara_principal: { resolucion: '', apertura: '' },
    bateria: 0,
    almacenamiento: 0,
    unidades: 1
  };

  constructor(public loginService: LoginService, 
    private celularesService: CelularesService, 
    private route: ActivatedRoute, 
    private carrito: CarritoService, 
    private router: Router) 
    { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    this.isAdmind= this.loginService.getRole()==='administrador';
    if (key) {
      this.celularesService.getCelulares().subscribe(celulares => {
        const celular = celulares.find(c => c.key === key);
        if (celular) {
          // Assign the key property
          this.celular = { ...celular, key: celular.key ?? '' }; // Use '' or another default value
          this.celular.unidades = 1; // Set unidades to 1 after fetching the data
        }
      });
    }
  }
  
  comprar() {
    const userKey = this.loginService.getUserKey() ?? 'defaultUserKey';

  
    // Check if the user is authenticated
    if (this.loginService.isAuthenticated()) {
      const celularKey = this.celular.key ?? '';
  
      const celularForService = {
        marca: this.celular.marca,
        modelo: this.celular.modelo,
        precio: this.celular.precio,
        imagen_url: this.celular.imagen_url
      };
      const lugar = 'detalle';
      this.carrito.agregarAlCarrito(celularForService, userKey, celularKey, this.celular.unidades,lugar).subscribe(() => {
        // Redirect to the carritoCompras component
        // Use Angular Router to navigate
        this.router.navigate(['/carritoCompras']);
      });
    } else {
      // User is not authenticated, redirect to login
      this.router.navigate(['/login']);
    }
  }
}