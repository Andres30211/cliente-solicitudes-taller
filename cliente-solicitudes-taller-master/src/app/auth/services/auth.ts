import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
<<<<<<< HEAD
  private api = 'https://solicitudes-taller-production.up.railway.app/api/usuario/global';
=======
  // private api = 'https://solicitudes-taller-production.up.railway.app/api/usuario/global';
  private api = 'http://localhost:8080/api/usuario/global';
>>>>>>> 26a89ff (Se actualizo el desarrollo con bootstrap y SweetAlert2)

  constructor(private http: HttpClient){}

  public registro(user: any): Observable<any>{
    return this.http.post(`${this.api}/publico/registrar`, user);
  }

  public login(identidad: string, pass: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa( identidad + ":" + pass)
    });
<<<<<<< HEAD
    return this.http.get(`https://solicitudes-taller-production.up.railway.app/api/usuario/global/privado/${identidad}`, {headers});
  }

=======
    return this.http.get(`${this.api}/privado/${identidad}`, {headers});
  }

  public cerrarSesion(): void{
    localStorage.clear();
  }
>>>>>>> 26a89ff (Se actualizo el desarrollo con bootstrap y SweetAlert2)
  
}
