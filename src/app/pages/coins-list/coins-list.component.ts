import { Component } from '@angular/core';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-coins-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './views/coins-list.component.html',
  styleUrl: './views/coins-list.component.scss'
})

export class CoinsListComponent {

}
