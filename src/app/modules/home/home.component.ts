import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title: string = "Conversor de Moedas";
  description: string = "Projeto desenvolvido para o Desafio 04 da Residencia de Software da iUUL.";
}
