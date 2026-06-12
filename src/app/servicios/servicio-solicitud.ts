import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioSolicitud {
  
  private api = 'https://solicitudes-taller-production.up.railway.app/api/solicitudes/taller/global';
  private apiUser = 'https://solicitudes-taller-production.up.railway.app/api/solicitudes/taller/global';
  // private api = 'http://localhost:8080/api/solicitudes/taller/global';
  // private apiUser = 'http://localhost:8080/api/usuario/global';

  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  public getHeaders(): HttpHeaders {

    let headers = new HttpHeaders({
    });

    if (isPlatformBrowser(this.platformId)) {

      const token = localStorage.getItem('global_auth_token');

      if (token) {
        headers = headers.set('Authorization', `Basic ${token}`);
      }
    }

    return headers;
  }

  public entregar(id: number): Observable<any>{
    return this.http.put(`${this.api}/privado/entregar/${id}`, {}, {responseType: 'text'});
  }

  public listarSolicitudes(): Observable<any> {
    return this.http.get<any[]>(`${this.api}/privado/listar`
    );
  }

  public editarRol(identidad: string): Observable<any>{
    return this.http.put(`${this.api}/privado/update/${identidad}`, {});
  }

  public listarUsuarios(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUser}/privado/listar`);
  }
}
