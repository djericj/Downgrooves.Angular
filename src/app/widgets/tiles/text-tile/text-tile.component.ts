import { Component, Input, OnInit } from '@angular/core';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-text-tile',
  templateUrl: './text-tile.component.html',
  styleUrls: ['./text-tile.component.scss'],
})
export class TextTileComponent extends TileComponent {
  @Input() href: string;
  @Input() target: string = '_self';
  @Input() text: string;
  @Input() icon: { name: string; size: number };

  private brands = [
    'spotify',
    'youtube',
    'beatport',
    'soundcloud',
    'apple',
    'facebook',
    'twitter',
  ];

  getIconClasses() {
    let cssClass = '';
    if (!this.icon) return '';

    if (this.icon.name) {
      cssClass += this.isBrand(this.icon.name) ? 'fab' : 'fa';
      cssClass += ` fa-${this.icon.name}`;
      cssClass += ` fa-${this.icon.size}x`;
    }

    return cssClass;
  }

  isBrand(icon: string) {
    return this.brands.find((b) => b === icon);
  }

  override click() {
    return window.open(this.href, this.target);
  }
}
