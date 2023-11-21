import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { FacturaService } from 'src/app/services/factura.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {

  carritoData: any[] = []; // Array to store cart items
  isCartEmpty: boolean = true; // Flag to check if the cart is empty

  constructor(
    private carritoService: CarritoService,
    private facturaService: FacturaService,
    private usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    const userKey = sessionStorage.getItem('userKey') || 'defaultUserKey';

    this.carritoService.getCarrito(userKey).subscribe((carrito: any) => {
      if (carrito && carrito.carrito) {
        this.carritoData = Object.keys(carrito.carrito).map(key => ({
          key,
          ...carrito.carrito[key],
          subtotal: carrito.carrito[key].info.precio * carrito.carrito[key].unidades
        }));

        // Update the flag based on whether the cart is empty or not
        this.isCartEmpty = this.carritoData.length === 0;
      }
    });
  }
  confirmRealizarPedido() {
    const confirmation = window.confirm('¿Estás seguro de que quieres realizar la compra?');

    if (confirmation) {
        // If user confirms, call the realizarPedido function
        this.realizarPedido();
    }
}
realizarPedido() {
  const userKey = sessionStorage.getItem('userKey') || 'defaultUserKey';

  // Fetch user information
  this.usuariosService.getUsuarioPorId(userKey).subscribe((userData: any) => {
    // Construct the facturaData with the current date
    const facturaData = {
      usuario: {
        nombre: userData.nombre,
        telefono: userData.telefono,
        direccion: userData.direccion,
        correo: userData.correo
      },
      carrito: this.carritoData,
      total: this.calcularCostoTotal(),
      fecha: new Date().toISOString() // Add the current date in ISO format
    };

    // Save the factura
    this.facturaService.agregarFactura(userKey, facturaData).subscribe(() => {
      // Clear the carrito
      this.carritoService.eliminarCarrito(userKey).subscribe(() => {
        // Update the cart data after removing the items
        this.ngOnInit();
        window.location.reload();
      });
    });
  });
}

  actualizarUnidades(item: any) {
    const userKey = sessionStorage.getItem('userKey') || 'defaultUserKey';
    const lugar = 'carrito'
    this.carritoService.agregarAlCarrito(item.info, userKey, item.key, item.unidades,lugar).subscribe(() => {
      // Update the current item's subtotal and units
      item.subtotal = item.info.precio * item.unidades;
      
      // Update the local carritoData array
      const index = this.carritoData.findIndex(cartItem => cartItem.key === item.key);
      if (index !== -1) {
        this.carritoData[index] = { ...item };
      }
    });
  }

  eliminarItem(itemKey: string) {
    const userKey = sessionStorage.getItem('userKey') || 'defaultUserKey';

    this.carritoService.eliminarDelCarrito(userKey, itemKey).subscribe(() => {
      // Update the cart data after removing the item
      this.ngOnInit();
      window.location.reload()
    });
  }

  calcularCostoTotal(): number {
    const costoTotal = this.carritoData.reduce((total, item) => total + item.subtotal, 0);
    // Add 12% IVA
    const iva = costoTotal * 0.12;
    return costoTotal + iva;
  }
}