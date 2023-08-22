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
  @Input() onClick: () => void;

  constructor() { }

  click() {
    this.onClick();
  }


}

@Component({
  selector: 'app-text-tile',
  template: `
      <section class="hover-bg">
        <a (click)="this.click()" [target]="this.target">
          <div class="hover-text">
            <h4>{{ this.text }}</h4>
          </div>
          <i [class]="classes"></i>
        </a>
      </section>`,
  styleUrls: ['./tile.component.scss']

})
export class TextTileComponent extends TileComponent {
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
      <a (click)="this.click()">
        <img class="figure-img release-artwork" [src]="this.src" [alt]="this.alt" />
      </a>
  `,
  styleUrls: ['./tile.component.scss']
})
export class ImageTileComponent extends TileComponent {
  @Input() src: string;
  @Input() alt: string;
}