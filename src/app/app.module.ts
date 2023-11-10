import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './screens/productos/productos.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { HomeComponent } from './screens/home/home.component';
import { NosotrosComponent } from './screens/nosotros/nosotros.component';
import { CarritoComprasComponent } from './screens/carrito-compras/carrito-compras.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    NavBarComponent,
    FooterComponent,
    DetalleProductoComponent,
    HomeComponent,
    NosotrosComponent,
    CarritoComprasComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
