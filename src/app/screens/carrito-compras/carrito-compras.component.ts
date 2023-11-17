import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  carritoData: any[] = []; // Array to store cart items

  constructor(private carritoService: CarritoService) { }

  ngOnInit() {
    const userKey = sessionStorage.getItem('userKey') || 'defaultUserKey';

    this.carritoService.getCarrito(userKey).subscribe((carrito: any) => {
      if (carrito && carrito.carrito) {
        // Convert the cart object into an array
        this.carritoData = Object.keys(carrito.carrito).map(key => ({ key, ...carrito.carrito[key] }));
      }
    });
  }

  realizarPedido() {
    // Implement the logic for placing an order
    // Redirect or show a confirmation message
  }



  calcularCostoTotal(): number {
    return this.carritoData.reduce((total, item) => total + item.info.precio * item.unidades, 0);
  }
}