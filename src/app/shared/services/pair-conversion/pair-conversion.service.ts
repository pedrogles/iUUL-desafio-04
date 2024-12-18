import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ConversionData, ConversionRequest, ConversionResult } from '../../models/pair-conversion.model';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PairConversionService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getPairConversion(data: ConversionRequest): Observable<ConversionData> {
      return this.http.get<ConversionResult>(`${this.apiUrl}/pair/${data.from}/${data.to}/${data.value}`).pipe(
        map((response) => ({ 
          conversion_rate: response.conversion_rate,
	        conversion_result: response.conversion_result 
        })),
        catchError((error) => {
          console.error('Erro ao buscar dados:', error);
          throw new Error('Falha ao realizar conversão');
        })
      );
    }
}
