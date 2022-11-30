import { API } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(
    private http: HttpClient
  ) { }

  inserirCriterio(header: any, body: any) {
    return lastValueFrom(this.http.post(`${API}/criterion`, body, header))
  }

  inserirPalavra(header: any, body: any) {
    return lastValueFrom(this.http.post(`${API}/glossary`, body, header))
  }


}
