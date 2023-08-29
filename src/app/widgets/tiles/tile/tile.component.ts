import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  template: ` <ng-content></ng-content>`,
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  @Input() onClick: () => void;
  @Input() columnSize: number = 1;
  @Input() rowSize: number = 1;
  @Input() cssClasses?: string[];

  constructor() {}

  click() {
    this.onClick();
  }

  getCssClasses() {
    return this.cssClasses != null ? [...this.cssClasses] : [];
  }
}
