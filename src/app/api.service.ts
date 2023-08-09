import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://admin.micenfoc.com/api'; // Reemplaza esto con la URL de tu API

  constructor(private http: HttpClient) { }

  // Método para obtener datos de la API mediante una solicitud GET
  public getGroups(additionalUrl: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/groups?expand=type,typeConnection,leader&${additionalUrl}`);
  }

  public getGroup(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/groups?expand=type,typeConnection,leader&filter[id]=${id}`);
  }

  // dns2.p02.nsone.net
  // dns1.p02.nsone.net
  // dns3.p02.nsone.net
  // dns4.p02.nsone.net
}