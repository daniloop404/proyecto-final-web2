import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './screens/productos/productos.component';
import { DetalleProductoComponent } from './components/detalle-producto/detalle-producto.component';
import { CarritoComprasComponent } from './screens/carrito-compras/carrito-compras.component';
import { AdministracionComponent } from './screens/administracion/administracion.component';
import { FormularioCelularComponent } from './components/formulario-celular/formulario-celular.component';

const routes: Routes = [
  {path: 'productos', component:ProductosComponent},
  {path: 'detalleProducto/:key', component:DetalleProductoComponent},
  { path: 'carritocompras', component: CarritoComprasComponent },
  {path: 'administracion', component:AdministracionComponent},
  {path: 'formularioCelular', component:FormularioCelularComponent},
  {path: 'formularioCelular/:key', component:FormularioCelularComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
