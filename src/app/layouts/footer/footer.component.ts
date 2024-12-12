import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})

export class FooterComponent {
  apiName: string = "Exchange Rate API";
  apiUrl: string = "https://www.exchangerate-api.com/";
}
