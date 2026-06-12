import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { ServicioSolicitud } from '../../servicios/servicio-solicitud';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-list-users',
  imports: [CommonModule],
  templateUrl: './list-users.html',
  styleUrl: './list-users.css',
})
export class ListUsers {

  // private api = 'https://solicitudes-taller-production.up.railway.app/api/solicitudes/taller/global';
  private api = 'http://localhost:8080/api/solicitudes/taller/global';

  public usuarios: any[] = [];

  private platformId = inject(PLATFORM_ID);

  vendedor = {
    nombre:'',
    identidad:'',
    rol:''
  };

  constructor(private http: HttpClient,private serviceSoli: ServicioSolicitud, private dc: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const vendedorToken = JSON.parse(localStorage.getItem('global_user_token') || '{}');
      this.vendedor.nombre = vendedorToken.nombre;
      this.vendedor.rol = vendedorToken.rol;
      this.vendedor.identidad = vendedorToken.identidad;
    }
    this.cargarUsuarios();

  }

  getInitials(nombre: string): string {
    if (!nombre) return '??';
    return nombre
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  public editarRol(identidad: string){
    this.serviceSoli.editarRol(identidad).subscribe({
      next: (res) => {
        alert(`Se actualizo el rol de ${res.nombre}`);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  cargarUsuarios(){
    this.serviceSoli.listarUsuarios().subscribe({
      next: (data:any[]) => {
        const usuarioLogeado = localStorage.getItem('global_user_token');
        const identidadActual = usuarioLogeado ? JSON.parse(usuarioLogeado).identidad : null;
        this.usuarios = data.filter(u => u.identidad !== identidadActual);
        this.dc.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
