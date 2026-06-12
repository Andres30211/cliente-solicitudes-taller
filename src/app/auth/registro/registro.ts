import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  public user: FormGroup;

  constructor(private authService: Auth,private router: Router) {
    this.user = new FormGroup({
      nombre: new FormControl('', Validators.required),
      identidad: new FormControl('', [Validators.required, Validators.minLength(10)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(7)]),
    });
  }

  registrar() {
    this.authService.registro(this.user.value).subscribe({
      next: res => {
        Swal.fire({
          icon: 'success',
          title: 'Solicitud registrada',
          text: `El usuario: ${res.nombre}\n Fue creado con el rol: ${res.rol}`
        });
        this.router.navigate(['/login']);
      },
      error: err => {
        alert('Error al registrar');
      }
    });
  }
}
