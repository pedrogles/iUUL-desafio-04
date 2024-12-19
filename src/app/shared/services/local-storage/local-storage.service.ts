import { Injectable } from '@angular/core';
import { Conversion } from '../../models/local-storage.model';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  // Salva um item no localStorage
  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Recupera um item do localStorage
  getItem<T>(key: string): T | null{
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }

  // Remove um item específico do localStorage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  // Remove item especifico de um objeto atribuido ao value
  removeItemById(key: string, id: number): void {
    if(confirm('Você realmente deseja deletar esse historico?')) {
      const storage: Conversion[] | null = this.getItem(key)
      if(storage!.length === 1) {
          this.removeItem(key)
          location.reload();
      } else {
          const storageFiltered = storage!.filter(item => item.id !== id);
          this.setItem(key, storageFiltered)
          location.reload();
      };
    };
  }
}
