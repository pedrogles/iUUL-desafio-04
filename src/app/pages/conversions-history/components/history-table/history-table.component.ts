import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../../shared/services/local-storage/local-storage.service';
import { Conversion } from '../../../../shared/models/local-storage.model';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './views/history-table.component.html',
  styleUrl: './views/history-table.component.scss'
})
export class HistoryTableComponent {
  conversionHistory!: Conversion[]

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.getConversionHistory()
  }

  private getConversionHistory() {
    this.conversionHistory = this.localStorageService.getItem('conversion-history') || [];
  }

  deleteItem(id: number) {
    this.localStorageService.removeItemById('conversion-history', id)
  }
}
