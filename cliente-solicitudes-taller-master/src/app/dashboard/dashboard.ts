import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {  Component, inject, OnChanges, OnInit, PLATFORM_ID, SimpleChanges  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServicioSolicitud } from '../servicios/servicio-solicitud';
import { error } from 'console';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{

  private url = 'https://solicitudes-taller-production.up.railway.app/api/solicitudes/taller/global';

  public solicitudes: any[] = [];
  public usuarios: any[] = [];

  private platformId = inject(PLATFORM_ID);

  vendedor = {
      nombre:'',
      identidad:'',
      rol:''
  };

  formulario!: FormGroup;

  ordenCompraPdf!: File;
  planoPdf!: File;

  constructor(private http: HttpClient,
    private fb: FormBuilder,
    private serviceSoli: ServicioSolicitud) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const vendedorToken = JSON.parse(localStorage.getItem('global_user_token') || '{}');
      this.vendedor.nombre = vendedorToken.nombre;
      this.vendedor.rol = vendedorToken.rol;
      this.vendedor.identidad = vendedorToken.identidad;
      this.cargarUsuarios();
      this.cargarSolicitudes();
    }

    this.formatearFormulario();
  }

  formatearFormulario(){
    this.formulario = this.fb.group({
      nombreCliente: [''],
      nombreProducto: [''],
      cantidad: [''],
      ordenCompraPdf: [''],
      planoPdf: ['']
    });
  }

  entregar(id: number){
    this.serviceSoli.entregar(id).subscribe({
      next: (message) =>{
        alert(message);
      },
      error: (err) =>{
        console.log(err);
      }
    });
  }

  cargarSolicitudes(){
    setTimeout(() => {
      this.serviceSoli.listarSolicitudes().subscribe({
        next: (data:any[]) => {
  
          if(this.vendedor.rol === 'JEFE_TALLER'){
            this.solicitudes = [...data]
          }else{
            this.solicitudes = data.filter(item =>
            item.usuarioEntidad.identidad === this.vendedor.identidad);
          }
          
        },
        error: (err) => {
          console.log(err);
        }
      });
    }, 1000);
  }

  getFileUrl(ruta: string): string {
    return `https://solicitudes-taller-production.up.railway.app/${ruta}`;
  }

  guardar() {

    const formData = new FormData;

    formData.append('nombreCliente', this.formulario.get('nombreCliente')?.value);
    formData.append('nombreProducto', this.formulario.get('nombreProducto')?.value);
    formData.append('cantidad', this.formulario.get('cantidad')?.value);
    
    // formData.append('nombreVendedor', this.vendedor.nombre);
    formData.append('identidadVendedor', this.vendedor.identidad);

    if(this.ordenCompraPdf){
      formData.append('ordenCompraPdf', this.ordenCompraPdf);
    }

    if(this.planoPdf){
      formData.append('planoPdf', this.planoPdf);
    }

    this.http.post(`${this.url}/privado/save`, formData).subscribe({
      next: (res:any) => {

        alert(`Solicitud creada para: ${res.nombreCliente}`);

        this.formulario.reset();
        this.cargarSolicitudes();
      },
        error: (err) => {
          console.log(err);
        }
    });
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
    setTimeout(() => {
      this.serviceSoli.listarUsuarios().subscribe({
        next: (data:any[]) => {
          
          this.usuarios = [...data]

        },
        error: (err) => {
          console.log(err);
        }
      });
    }, 1000);
  }

  onFileChange(event: any, tipo: string){

    const file = event.target.files[0];

    if(!file) return;

    if(tipo === 'orden'){
      this.ordenCompraPdf = file;
    }

    if(tipo === 'plano'){
      this.planoPdf = file;
    }
  }
  
}
