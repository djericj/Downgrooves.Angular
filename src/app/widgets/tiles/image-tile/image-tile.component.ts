import { Component, Input, OnInit } from '@angular/core';
import { TileComponent } from '../tile/tile.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-image-tile',
  templateUrl: './image-tile.component.html',
  styleUrls: ['./image-tile.component.scss'],
  standalone: true,
  imports: [NgClass]
})
export class ImageTileComponent extends TileComponent {
  @Input() src: string;
  @Input() alt: string;
  @Input() title: string;
}
