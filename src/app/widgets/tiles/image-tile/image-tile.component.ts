import { Component, Input, OnInit } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-image-tile',
  templateUrl: './image-tile.component.html',
  styleUrls: ['./image-tile.component.scss'],
})
export class ImageTileComponent extends TileComponent {
  @Input() src: string;
  @Input() alt: string;
}
