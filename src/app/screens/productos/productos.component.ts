import { Component } from '@angular/core';
import { CelularesService } from 'src/app/services/celulares.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent {
  constructor(private servicio: CelularesService) {}
  dataCelulares: { [key: string]: any }[] = [];
  celularesPorMarca: any[] = [];
  mostrarAll = false;

  ngOnInit() {
    this.cargarCelulares();
    this.mostrarAll = true;
  }

  cargarCelulares(): void {
    this.servicio.getCelulares().subscribe((datos: Record<string, any>) => {
      this.dataCelulares = Object.entries(datos).map(([key, value]) => ({
        key,
        ...value,
      }));
    });
  }

  marcaClickeada(marca: string): void {
    this.cargarCelularesPorMarca(marca);
    console.log(marca);
    this.mostrarAll = false;
  }

  cargarCelularesPorMarca(marca: string): void {
    this.servicio.getCelularesPorMarca(marca).subscribe((data) => {
      this.celularesPorMarca = data;
    });
  }
}
