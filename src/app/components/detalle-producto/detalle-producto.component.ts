import { Component, OnInit } from '@angular/core';
import { CelularesService } from 'src/app/services/celulares.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {

  celular: any;

  constructor(private celularesService: CelularesService, private route: ActivatedRoute) { }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');
    if (key) {
      this.celularesService.getCelularPorId(key).subscribe(celular => {
        this.celular = celular;
      });
    }
  }

}