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
import { AdministracionComponent } from './screens/administracion/administracion.component';
import { FormularioCelularComponent } from './components/formulario-celular/formulario-celular.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Error404Component } from './screens/error404/error404.component';
import { TerminosCondicionesComponent } from './screens/terminos-condiciones/terminos-condiciones.component';
import { FacturaComponent } from './screens/factura/factura.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    NavBarComponent,
    FooterComponent,
    DetalleProductoComponent,
    HomeComponent,
    NosotrosComponent,
    CarritoComprasComponent,
    AdministracionComponent,
    FormularioCelularComponent,
    
    Error404Component,
    TerminosCondicionesComponent,
    FacturaComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
