import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Menubar],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Início',
              routerLink: '/'
          },
          {
            label: 'Listagem de Moedas',
            routerLink: '/listagem-de-moedas'
          },
          {
            label: 'Conversão de Moedas',
            routerLink: '/conversao-de-moedas'
          },
      ]
  }
}
