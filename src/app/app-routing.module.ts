import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './screens/productos/productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { CarritoComprasComponent } from './screens/carrito-compras/carrito-compras.component';
import { HomeComponent } from './screens/home/home.component';
import { NosotrosComponent } from './screens/nosotros/nosotros.component';
import { TerminosCondicionesComponent } from './screens/terminos-condiciones/terminos-condiciones.component';
import { FacturaComponent } from './screens/factura/factura.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'nosotros', component:NosotrosComponent},
  {path: 'productos', component:ProductosComponent},
  {path: 'detalleProducto/:id', component:DetalleProductoComponent},
  { path: 'carritocompras', component: CarritoComprasComponent },
  {path: 'terminos-condiciones', component: TerminosCondicionesComponent},
  {path: 'factura', component: FacturaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
