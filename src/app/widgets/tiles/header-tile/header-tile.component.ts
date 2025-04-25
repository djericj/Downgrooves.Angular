import { Component, Input } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header-tile',
  templateUrl: './header-tile.component.html',
  styleUrls: ['./header-tile.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class HeaderTileComponent extends TileComponent {
  @Input() title?: string;
  @Input() subTitle?: string;
}
