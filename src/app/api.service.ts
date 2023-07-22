import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://admin.micenfoc.com/api'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  // Ejemplo de método para obtener datos de la API mediante una solicitud GET
  public getGroups(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/groups`);
  }

  // Puedes agregar más métodos para realizar otras operaciones (POST, PUT, DELETE, etc.)
}
