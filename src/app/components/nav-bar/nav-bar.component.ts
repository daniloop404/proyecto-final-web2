import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isCartEmpty = true;

  constructor(public loginService: LoginService, private carritoService: CarritoService) { }

  ngOnInit(): void {
    // Call a method to check if the cart is empty when the component initializes
    this.checkCartEmpty();
  }

  logout(): void {
    this.loginService.logout();
    // Redirect to the home page or any other desired page after logout
  }

  checkCartEmpty(): void {
    // Get the user key from the login service
    const userKey = this.loginService.getUserKey();

    if (userKey) {
      // Check the cart using the CarritoService
      this.carritoService.getCarrito(userKey).subscribe((carrito) => {
        // Update the isCartEmpty property based on whether the cart is empty or not
        this.isCartEmpty = !carrito || !carrito.carrito || Object.keys(carrito.carrito).length === 0;
      });
    }
  }
}