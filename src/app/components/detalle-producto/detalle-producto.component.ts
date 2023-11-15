import { Component, OnInit } from '@angular/core';
import { CelularesService } from 'src/app/services/celulares.service';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  celular: any;

  constructor(private celularesService: CelularesService, private route: ActivatedRoute, private carrito: CarritoService) { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.celularesService.getCelularPorId(key).subscribe(celular => {
        this.celular = celular;
      });
    }
  }

  comprar(){
    this.carrito.postCarrito(this.celular).subscribe()
  }
}