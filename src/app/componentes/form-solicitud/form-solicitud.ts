import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-solicitud',
  imports: [ReactiveFormsModule],
  templateUrl: './form-solicitud.html',
  styleUrl: './form-solicitud.css',
})
export class FormSolicitud {

  private api = 'https://solicitudes-taller-production.up.railway.app/api/solicitudes/taller/global';
  // private api = 'http://localhost:8080/api/solicitudes/taller/global';

  public formulario!: FormGroup;

  ordenCompraPdf!: File;
  planoPdf!: File;

  vendedor = {
      nombre:'',
      identidad:'',
      rol:''
  };

  constructor(private http: HttpClient, private router: Router) {
    this.formulario = new FormGroup({
      nombreCliente: new FormControl('', Validators.required),
      nombreProducto: new FormControl('', Validators.required),
      cantidad: new FormControl(0, [Validators.required, Validators.min(1)]),
      ordenCompraPdf: new FormControl(null, Validators.required),
      planoPdf: new FormControl(null, Validators.required)
    });
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

    this.http.post(`${this.api}/privado/save`, formData).subscribe({
      next: (res:any) => {

        Swal.fire({
          icon: 'success',
          title: 'Solicitud registrada',
          text: `Solicitud creada para: ${res.nombreCliente}`
        });
        this.router.navigate(['/listado-solicitud']);
      },
        error: (err) => {
          console.log(err);
        }
    });
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
