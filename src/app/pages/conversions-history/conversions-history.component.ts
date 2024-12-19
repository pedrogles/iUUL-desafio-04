import { Component } from '@angular/core';
import { HistoryTableComponent } from "./components/history-table/history-table.component";

@Component({
  selector: 'app-conversions-history',
  standalone: true,
  imports: [HistoryTableComponent],
  templateUrl: './views/conversions-history.component.html',
  styleUrl: './views/conversions-history.component.scss'
})
export class ConversionsHistoryComponent {

}
