import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CelularesService } from 'src/app/services/celulares.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent {

  constructor(private servicio: CelularesService, private activatedRoute:ActivatedRoute){}

  dataCelulares: any;
  celular: any;
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
        const celularId = +params['id'];
        this.servicio.getCelularPorId(celularId).subscribe((celular: any) => {
          this.celular = celular;
        });
      
    });
  }
}
