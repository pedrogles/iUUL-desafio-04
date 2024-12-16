import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Coin } from '../models/coin';
import { map, catchError } from 'rxjs/operators';
import { ApiResponseCoins } from '../models/apiResponseCoins';

@Injectable({
  providedIn: 'root'
})

export class CoinsListService {
  private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) { }

    getCodes(): Observable<Coin[]> {
      return this.http.get<ApiResponseCoins>(`${this.apiUrl}/codes`).pipe(
        map((response) => response.supported_codes),
        catchError((error) => {
          console.error('Erro ao buscar dados:', error);
          throw new Error('Falha ao carregar códigos');
        })
      );
    }
}
