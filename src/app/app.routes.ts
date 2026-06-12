import { Routes } from '@angular/router';
import { Registro } from './auth/registro/registro';
import { Login } from './auth/login/login';
import { authGuard } from './auth/guards/auth-guard';
import { FormSolicitud } from './componentes/form-solicitud/form-solicitud';
import { ListSolicitud } from './componentes/list-solicitud/list-solicitud';
import { ListUsers } from './componentes/list-users/list-users';

export const routes: Routes = [

    { path: '', redirectTo: 'registro', pathMatch: 'full' },
    { path: 'registro', component: Registro },
    { path: 'login', component: Login },
    { path: 'formulario-solicitud', component: FormSolicitud, canActivate: [authGuard] },
    { path: 'listado-solicitud', component: ListSolicitud, canActivate: [authGuard] },
    { path: 'listado-usuarios', component: ListUsers, canActivate: [authGuard]}
];
