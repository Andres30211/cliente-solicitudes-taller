import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { Auth } from '../../auth/services/auth';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit{

  public mostrarNav: boolean = false;
  public mostrarBuscador: boolean = false;
  private routerSubscription!: Subscription;

  constructor(private router: Router, private auth: Auth){}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe({
      next: (event:any) =>{
        this.mostrarNav = event.urlAfterRedirects === '/listado-solicitud' ||
         event.urlAfterRedirects === '/formulario-solicitud' ||
         event.urlAfterRedirects === '/listado-usuarios';
        this.mostrarBuscador = (event.urlAfterRedirects === '/listado-solicitud');
      }
    });
  }

  public cerrarSesion(): void{
    this.auth.cerrarSesion();
    this.router.navigate(['/login']);
  }
}
