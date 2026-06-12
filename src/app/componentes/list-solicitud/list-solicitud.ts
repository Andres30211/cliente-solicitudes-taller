import { ChangeDetectorRef, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ServicioSolicitud } from '../../servicios/servicio-solicitud';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-solicitud',
  imports: [CommonModule],
  templateUrl: './list-solicitud.html',
  styleUrl: './list-solicitud.css',
})
export class ListSolicitud implements OnInit{

  public solicitudes: any[] = [];

  private platformId = inject(PLATFORM_ID);

  vendedor = {
    nombre:'',
    identidad:'',
    rol:''
  };

  constructor(private serviceSoli: ServicioSolicitud, private dc: ChangeDetectorRef, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const vendedorToken = JSON.parse(localStorage.getItem('global_user_token') || '{}');
      this.vendedor.nombre = vendedorToken.nombre;
      this.vendedor.rol = vendedorToken.rol;
      this.vendedor.identidad = vendedorToken.identidad;
    }
      this.cargarSolicitudes();
  }

  getFileUrlSafe(ruta: string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(
    `http://localhost:8080/${ruta}`
  );
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

  cargarSolicitudes(){
    this.serviceSoli.listarSolicitudes().subscribe({
      next: (data:any[]) => {

        if(this.vendedor.rol === 'JEFE_TALLER'){
          this.solicitudes = [...data]
        }else{
          this.solicitudes = data.filter(item =>
            item.usuarioEntidad.identidad === this.vendedor.identidad);
        }
        this.dc.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  public async entregar(u: any){

    const resultado = await Swal.fire({
      title: 'Confirmación',
      text: `Deséa entregar la solicitud de ${u.nombreCliente} del vendedor ${u.usuarioEntidad.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    });

    if(resultado.isConfirmed){
      this.serviceSoli.entregar(u.id).subscribe({
        next: (message) =>{
          Swal.fire({
            icon: 'success',
            title: 'Solicitud entregada',
            text: message
          });
          this.cargarSolicitudes();
        },
        error: (err) =>{
          console.log(err);
        }
      });
    }
  }

  getFileUrl(ruta: string): string {
    return `http://localhost:8080/${ruta}`;
  }
}
