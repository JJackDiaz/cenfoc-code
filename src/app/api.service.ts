import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://admin.micenfoc.com/api'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener datos de la API mediante una solicitud GET
  public getGroups(additionalUrl: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/groups?expand=type,typeConnection,leader&${additionalUrl}`);
  }

  public getGroup(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/groups?expand=type,typeConnection,leader&filter[id]=${id}`);
  }

  public createPerson(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/person/enroll`, data);
  }
}
