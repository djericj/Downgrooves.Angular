import { Component, Input } from '@angular/core';
import { HeaderTileComponent } from '../header-tile/header-tile.component';


@Component({
  selector: 'app-header-definition-tile',
  templateUrl: './header-definition-tile.component.html',
  styleUrls: ['./header-definition-tile.component.scss'],
  standalone: true,
  imports: []
})
export class HeaderDefinitionTileComponent extends HeaderTileComponent {
  @Input() definition?: string;
  @Input() partOfSpeech?: string;
  @Input() meanings?: string[];
}
