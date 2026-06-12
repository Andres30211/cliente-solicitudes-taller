import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
=======
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
>>>>>>> 26a89ff (Se actualizo el desarrollo con bootstrap y SweetAlert2)
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

<<<<<<< HEAD
  identidad = '';
  password = '';
=======
  public user: FormGroup;
>>>>>>> 26a89ff (Se actualizo el desarrollo con bootstrap y SweetAlert2)

  constructor(
    private authService: Auth,
    private router: Router
<<<<<<< HEAD
  ) {}

  public ingresar() {

    this.authService.login(this.identidad, this.password)
=======
  ) {

    this.user = new FormGroup({
      identidad: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(7)])
    });
  }

  public ingresar() {

    this.authService.login(this.user.get('identidad')?.value, this.user.get('contrasena')?.value)
>>>>>>> 26a89ff (Se actualizo el desarrollo con bootstrap y SweetAlert2)
      .subscribe({
        next: res => {

          localStorage.setItem(
            'global_auth_token',
<<<<<<< HEAD
            btoa(this.identidad + ':' + this.password)
=======
            btoa(this.user.get('identidad')?.value + ':' + this.user.get('contrasena')?.value)
>>>>>>> 26a89ff (Se actualizo el desarrollo con bootstrap y SweetAlert2)
          );

          localStorage.setItem(
            'global_user_token', JSON.stringify(res)
          );
<<<<<<< HEAD
          this.router.navigate(['/dashboard']);
=======
          this.router.navigate(['/listado-solicitud']);
>>>>>>> 26a89ff (Se actualizo el desarrollo con bootstrap y SweetAlert2)
          
        },
        error: err => {
          alert('Credenciales incorrectas');
        }
      });

  }
}
