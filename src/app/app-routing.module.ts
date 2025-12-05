import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'crear-nota',
    loadChildren: () => import('./crear-nota/crear-nota.module').then( m => m.CrearNotaPageModule)
  },
  {
    path: 'detalle-nota/:id',
    loadChildren: () => import('./detalle-nota/detalle-nota.module').then( m => m.DetalleNotaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
