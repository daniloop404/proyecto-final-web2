import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './screens/productos/productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { CarritoComprasComponent } from './screens/carrito-compras/carrito-compras.component';

const routes: Routes = [
  {path: 'productos', component:ProductosComponent},
  {path: 'detalleProducto/:id', component:DetalleProductoComponent},
  { path: 'carritocompras', component: CarritoComprasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
