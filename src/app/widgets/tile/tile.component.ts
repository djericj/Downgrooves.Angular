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
  selector: 'app-header-tile',
  template: `
  <section [class]="this.sectionClasses">
    <p *ngIf="this.title" class="header-title">
      {{ this.title }}
    </p>
    <p *ngIf="this.subTitle" class="header-subtitle">
      {{ this.subTitle }}
    </p>
  </section>
  `,
  styleUrls: ['./tile.component.scss']
})
export class HeaderTileComponent extends TileComponent {
  @Input() title?: string;
  @Input() subTitle?: string;
  @Input() cssClasses?: string[];

  get sectionClasses() {
    return Array.isArray(this.cssClasses) ? [...this.cssClasses] : [];
  }
}

@Component({
  selector: 'app-text-tile',
  template: `
      <section [class]="this.sectionClasses">
        <a [href]="this.href" (click)="this.click()" [target]="this.target">
          <div class="hover-text">
            <h4>{{ this.text }}</h4>
          </div>
          <i [class]="this.iconClasses"></i>
        </a>
      </section>`,
  styleUrls: ['./tile.component.scss']

})
export class TextTileComponent extends TileComponent {
  @Input() href: string;
  @Input() target: string = "_self";
  @Input() text: string;
  @Input() icon: { name: string, size: number };
  @Input() cssClasses?: string[];

  get iconClasses() {
    let cssClass = "fa-solid fa-brands";

    if (this.icon.name)
      cssClass += ` fa-${this.icon.name}`;

    cssClass += ` fa-${this.icon.size}x`;

    return cssClass;
  }

  get sectionClasses() {
    return Array.isArray(this.cssClasses) ? [...this.cssClasses, 'hover-bg'] : ['hover-bg'];
  }
}

@Component({
  selector: 'app-image-tile',
  template: `
      <a (click)="this.click()">
        <img [class]="this.cssClasses" [src]="this.src" [alt]="this.alt" />
      </a>
  `,
  styleUrls: ['./tile.component.scss']
})
export class ImageTileComponent extends TileComponent {
  @Input() src: string;
  @Input() alt: string;
  @Input() cssClasses?: string[];
}

