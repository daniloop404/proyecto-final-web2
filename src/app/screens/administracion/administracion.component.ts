import { Component } from '@angular/core';
import { CelularesService } from 'src/app/services/celulares.service';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent {
  constructor(private servicio: CelularesService){}
   dataCelulares: any;

  ngOnInit(){
    this.servicio.getCelulares().subscribe(datos=>{
      this.dataCelulares=datos;
    })
  }
}
