import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  public user: FormGroup;

  constructor(private authService: Auth, private router: Router) {
    this.user = new FormGroup({
      identidad: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(7)])
    });
  }

  public ingresar() {

    this.authService.login(this.user.get('identidad')?.value, this.user.get('contrasena')?.value)
      .subscribe({
        next: res => {

          localStorage.setItem(
            'global_auth_token',
            btoa(this.user.get('identidad')?.value + ':' + this.user.get('contrasena')?.value)
          );

          localStorage.setItem(
            'global_user_token', JSON.stringify(res)
          );
          this.router.navigate(['/listado-solicitud']);
          
        },
        error: err => {
          alert('Credenciales incorrectas');
        }
      });

  }
}
