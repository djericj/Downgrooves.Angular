import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tile',
  template: ` <div class="grid-item hover-bg"><ng-content></ng-content></div> `,
  styleUrls: ['./tile.component.scss'],
})
export class TileComponent {
  @Input() onClick: () => void;
  @Input() columnSize: number = 1;
  @Input() rowSize: number = 1;
  @Input() cssClasses?: string[];

  public classes: string[];

  constructor() {}

  click() {
    this.onClick();
  }

  getClasses() {
    let classes = ['grid-item'];
    if (this.columnSize && this.columnSize > 1)
      classes.push(`grid-item--width${this.columnSize}`);

    if (this.rowSize && this.rowSize > 1)
      classes.push(`grid-item--height${this.rowSize}`);

    return [classes, ...(this.cssClasses || [])];
  }
}

@Component({
  selector: 'app-header-tile',
  template: `
    <div
      [ngClass]="{
        'grid-item': true,
        'grid-item--width2': true,
        'grid-item--height2': true
      }"
    >
      <p *ngIf="this.title" class="header-title">
        {{ this.title }}
      </p>
      <p *ngIf="this.subTitle" class="header-subtitle">
        {{ this.subTitle }}
      </p>
    </div>
  `,
  styleUrls: ['./tile.component.scss'],
})
export class HeaderTileComponent extends TileComponent {
  @Input() title?: string;
  @Input() subTitle?: string;
}

@Component({
  selector: 'app-text-tile',
  template: ` <div
    [ngClass]="{
      'grid-item': true
    }"
  >
    <a [href]="this.href" (click)="this.click()" [target]="this.target">
      <div class="hover-text">
        <h4>{{ this.text }}</h4>
      </div>
      <i [ngClass]="{ 'fa-solid': true }"></i>
    </a>
  </div>`,
  styleUrls: ['./tile.component.scss'],
})
export class TextTileComponent extends TileComponent {
  @Input() href: string;
  @Input() target: string = '_self';
  @Input() text: string;
  @Input() icon: { name: string; size: number };

  get iconClasses() {
    let cssClass = 'fa-solid fa-brands';

    if (this.icon.name) cssClass += ` fa-${this.icon.name}`;

    cssClass += ` fa-${this.icon.size}x`;

    return cssClass;
  }
}

@Component({
  selector: 'app-image-tile',
  template: `
    <div
      [ngClass]="{
        'grid-item': true,
        'grid-item--width2': this.columnSize == 2,
        'grid-item--height2': this.rowSize == 2
      }"
    >
      <a (click)="this.click()">
        <img [src]="this.src" [alt]="this.alt" />
      </a>
    </div>
  `,
  styleUrls: ['./tile.component.scss'],
})
export class ImageTileComponent extends TileComponent {
  @Input() src: string;
  @Input() alt: string;
}
