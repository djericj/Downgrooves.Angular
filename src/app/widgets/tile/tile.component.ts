import { Component, Input } from '@angular/core';
import { Release } from 'src/app/models/release';

@Component({
  selector: 'app-tile',
  template: `
    <section class="hover-bg"><ng-content></ng-content></section>
    `,
  styleUrls: ['./tile.component.scss']
})
export class TileComponent {
  @Input() content: () => string;

  constructor() { }
}

@Component({
  selector: 'app-text-tile',
  template: `
      <section class="hover-bg">
        <a [href]="this.href" [target]="this.target">
          <div class="hover-text">
            <h4>{{ this.text }}</h4>
          </div>
          <i [class]="classes"></i>
        </a>
      </section>`,
  styleUrls: ['./tile.component.scss']

})
export class TextTileComponent {
  @Input() href: string;
  @Input() target: string = "_self";
  @Input() text: string;
  @Input() iconName: string;
  @Input() iconSize: string = "2";

  get classes() {
    let cssClass = "fa-solid";

    if (this.iconName)
      cssClass += ` fa-${this.iconName}`;

    cssClass += ` fa-${this.iconSize}x`;

    return cssClass;
  }
}

@Component({
  selector: 'app-image-tile',
  template: `
      <a (click)="this.navigate()">
        <img class="figure-img release-artwork" [src]="this.src" [alt]="this.alt" />
      </a>
  `,
  styleUrls: ['./tile.component.scss']
})
export class ImageTileComponent {
  @Input() src: string;
  @Input() alt: string;
  @Input() navigateTo: () => void;

  navigate() {
    this.navigateTo;
  }
}