import { Component, ViewChild } from '@angular/core';
import { TableModule, Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SortEvent } from 'primeng/api';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Coin } from '../../../../shared/models/supported-codes.model';
import { SupportedCodesService } from '../../../../shared/services/supported-codes/supported-codes.service';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule, CommonModule, IconFieldModule, InputIconModule],
  templateUrl: './views/list.component.html',
  styleUrls: ['./views/list.component.scss'],
})

export class ListComponent {
  @ViewChild('dt') dt!: Table; // Referência à tabela PrimeNG

  coins!: Coin[]; // Armazenará os dados da API
  initialValue!: Coin[]; // Valor inicial para restaurar os dados
  isSorted: boolean | null = null; // Controle de estado de ordenação

  constructor(private supportedCodesService: SupportedCodesService) {}

  ngOnInit() {
    this.getCodes();
  }

  private getCodes() {
    this.supportedCodesService.getCodes().subscribe({
      next: (coins) => {
        this.coins = coins;
        this.initialValue = coins;
      },
      error: (err) => console.error('Erro ao carregar moedas:', err.message)
    });
  }

  // Função de filtragem
  filterItems(event: Event) {
    const inputElement = event.target as HTMLInputElement; // Garante que é um input
    const value = inputElement.value.trim().toLowerCase(); // Remove espaços e transforma em minúsculo
    if (value) {
      this.coins = this.initialValue.filter((coin) => 
        coin[1].toLowerCase().includes(value)
      );
    } else {
      // Restaura a lista original caso o filtro esteja vazio
      this.coins = [...this.initialValue];
    }
  }

  // Função de ordenação personalizada
  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.coins = [...this.initialValue]; // Restaura o valor inicial
      this.dt.reset(); // Reseta o estado da tabela
    }
  }

  // Função que aplica a lógica de ordenação
  sortTableData(event: SortEvent) {
    if (!event.data || event.order === undefined || !event.field) {
        return; // Sai da função se `data`, `order`, ou `field` estiverem indefinidos
    }
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field!];
        let value2 = data2[event.field!];
        let result = null;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') {
            result = value1.localeCompare(value2);
        } else {
            result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        }

        return (event.order ?? 1) * result; // Usa 1 como valor padrão se `order` for undefined
    });
  }
}