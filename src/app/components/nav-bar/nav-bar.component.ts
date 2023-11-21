import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  isCartEmpty = true;
  private cartSubscription!: Subscription;

  constructor(
    public loginService: LoginService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.checkCartEmpty();
}

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.loginService.logout();
    this.isCartEmpty = true; // Set to true when logging out
    this.router.navigate(['/']);
  }

  checkCartEmpty(): void {
    const userKey = this.loginService.getUserKey();

    if (userKey) {
      this.cartSubscription = this.carritoService
        .getCarrito(userKey)
        .subscribe((carrito) => {
          this.isCartEmpty =
            !carrito || !carrito.carrito || Object.keys(carrito.carrito).length === 0;
        });
    } else {
      this.isCartEmpty = true; // Set to true if no user key is available
    }
  }

  addToCart(): void {
    // Your logic to add an item to the cart

    // Update isCartEmpty immediately
    this.isCartEmpty = false;
  }
}