import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  private api = 'https://solicitudes-taller-production.up.railway.app/api/usuario/global';
  // private api = 'http://localhost:8080/api/usuario/global';

  constructor(private http: HttpClient){}

  public registro(user: any): Observable<any>{
    return this.http.post(`${this.api}/publico/registrar`, user);
  }

  public login(identidad: string, pass: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa( identidad + ":" + pass)
    });
    return this.http.get(`${this.api}/privado/${identidad}`, {headers});
  }

  public cerrarSesion(): void{
    localStorage.clear();
  }
  
}
