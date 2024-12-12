import { Component } from '@angular/core';
import { HeaderComponent } from "./layouts/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./layouts/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {

}
