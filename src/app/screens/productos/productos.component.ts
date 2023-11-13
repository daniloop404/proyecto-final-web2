import { Component } from '@angular/core';
import { CelularesService } from 'src/app/services/celulares.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  constructor(private servicio: CelularesService){}
  dataCelulares: { [key: string]: any }[] = [];
  
  ngOnInit() {
    this.servicio.getCelulares().subscribe((datos: Record<string, any>) => {
      this.dataCelulares = Object.entries(datos).map(([key, value]) => ({ key, ...value }));
    });
  }
}