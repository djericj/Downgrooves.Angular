import { Component } from '@angular/core';
import { HeaderComponent } from './widgets/header/header.component';
import { RouterOutlet } from '@angular/router';
import { PlayerComponent } from './components/player/player.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, PlayerComponent]
})
export class AppComponent {
  title = 'Downgrooves.Angular';
}
