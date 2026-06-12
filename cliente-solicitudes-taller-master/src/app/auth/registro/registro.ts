import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
=======
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
>>>>>>> 26a89ff (Se actualizo el desarrollo con bootstrap y SweetAlert2)
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

<<<<<<< HEAD
  user = {
    nombre:'',
    identidad:'',
    contrasena:''
  };
=======
  public user: FormGroup;
>>>>>>> 26a89ff (Se actualizo el desarrollo con bootstrap y SweetAlert2)

  constructor(
    private authService: Auth,
    private router: Router
<<<<<<< HEAD
  ) {}

  registrar() {
    this.authService.registro(this.user).subscribe({
      next: res => {
        alert(`El usuario: ${res.nombre}\n Fue creado con el rol: ${res.rol}`);
=======
  ) {
    this.user = new FormGroup({
      nombre: new FormControl('', Validators.required),
      identidad: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(7)])
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
>>>>>>> 26a89ff (Se actualizo el desarrollo con bootstrap y SweetAlert2)
        this.router.navigate(['/login']);
      },
      error: err => {
        alert('Error al registrar');
      }
    });
  }
}
