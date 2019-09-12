import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'caratula',
    pathMatch: 'full'
  },
  { path: 'cargando', loadChildren: './pantallas/cargando/cargando.module#CargandoPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'registro', loadChildren: './auth/registrar/registrar.module#RegistrarPageModule' },
  { path: 'caratula', loadChildren: './pantallas/caratula/caratula.module#CaratulaPageModule', canActivate: [AuthGuard] },
  {
    path: 'seleccionar-ubicacion',
    loadChildren: './pantallas/tareas/seleccionar-ubicacion/seleccionar-ubicacion.module#SeleccionarUbicacionPageModule' 
  },
  {
    path: 'gestionar-bien',
    loadChildren: './pantallas/tareas/seleccionar-ubicacion/gestionar-bien/gestionar-bien.module#GestionarBienPageModule' 
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
