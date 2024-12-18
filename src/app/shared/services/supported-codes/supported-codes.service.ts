import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { ApiResponseSupportedCodes, Coin } from '../../models/supported-codes.model';

@Injectable({
  providedIn: 'root'
})

export class SupportedCodesService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getCodes(): Observable<Coin[]> {
    return this.http.get<ApiResponseSupportedCodes>(`${this.apiUrl}/codes`).pipe(
      map((response) => response.supported_codes),
      catchError((error) => {
        console.error('Erro ao buscar dados:', error);
        throw new Error('Falha ao carregar códigos');
      })
    );
  }
}
