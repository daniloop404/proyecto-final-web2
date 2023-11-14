import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './screens/productos/productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { CarritoComprasComponent } from './screens/carrito-compras/carrito-compras.component';
import { AdministracionComponent } from './screens/administracion/administracion.component';
import { FormularioCelularComponent } from './components/formulario-celular/formulario-celular.component';
import { HomeComponent } from './screens/home/home.component';
import { NosotrosComponent } from './screens/nosotros/nosotros.component';
import { TerminosCondicionesComponent } from './screens/terminos-condiciones/terminos-condiciones.component';
import { FacturaComponent } from './screens/factura/factura.component';
import { Error404Component } from './screens/error404/error404.component';
import { RegistroComponent } from './screens/registro/registro.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'nosotros', component:NosotrosComponent},
  {path: 'productos', component:ProductosComponent},
  {path: 'detalleProducto/:key', component:DetalleProductoComponent},
  { path: 'carritocompras', component: CarritoComprasComponent },
  {path: 'administracion', component:AdministracionComponent},
  {path: 'formularioCelular', component:FormularioCelularComponent},
  {path: 'formularioCelular/:key', component:FormularioCelularComponent},
  {path: 'terminos-condiciones', component: TerminosCondicionesComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'factura', component: FacturaComponent},

  {path:'**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
