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

@Component({
  selector: 'app-header-tile',
  template: `
    <div [class]="this.cssClasses">
      <h2 *ngIf="this.title" [class.title]="true">
        {{ this.title }}
      </h2>
      <p *ngIf="this.subTitle" [class.subtitle]="true">
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
  selector: 'app-header-definition-tile',
  template: `
    <div [class]="this.cssClasses">
      <div [class.title]="true">
        <h2 *ngIf="this.title" [class.title]="true">
          {{ this.title }}
        </h2>
        <p *ngIf="this.subTitle">
          {{ this.subTitle }}
        </p>
      </div>
      <div *ngIf="this.definition" class="definition">
        <h4 *ngIf="this.definition">
          {{ this.definition }}
          <span *ngIf="this.partOfSpeech" class="speech-part">
            - {{ this.partOfSpeech }}</span
          >
        </h4>
        <ol *ngIf="this.meanings">
          <li *ngFor="let meaning of meanings; index as i">
            {{ this.meaning }}
          </li>
        </ol>
      </div>
    </div>
  `,
  styleUrls: ['./tile.component.scss'],
})
export class HeaderDefinitionTileComponent extends HeaderTileComponent {
  @Input() definition?: string;
  @Input() partOfSpeech?: string;
  @Input() meanings?: string[];
}

@Component({
  selector: 'app-text-tile',
  template: `
    <a
      [ngClass]="getCssClasses()"
      [class.text-tile]="true"
      [class.hover-bg]="true"
      [href]="this.href"
      (click)="this.click()"
      [target]="this.target"
    >
      <div class="hover-text">
        <h4>{{ this.text }}</h4>
      </div>
      <i [ngClass]="getIconClasses()" [class.fa]="true"></i>
    </a>
  `,
  styleUrls: ['./tile.component.scss'],
})
export class TextTileComponent extends TileComponent {
  @Input() href: string;
  @Input() target: string = '_self';
  @Input() text: string;
  @Input() icon: { name: string; size: number };

  getIconClasses() {
    let cssClass = '';

    if (this.icon.name) cssClass += ` fa-${this.icon.name}`;

    cssClass += ` fa-${this.icon.size}x`;

    return cssClass;
  }
}

@Component({
  selector: 'app-image-tile',
  template: `
    <div [ngClass]="getCssClasses()" [class.image-tile]="true">
      <a *ngIf="this.onClick" (click)="this.click()" [class.pointer]="true">
        <img [src]="this.src" [alt]="this.alt" />
      </a>
      <img *ngIf="!this.onClick" [src]="this.src" [alt]="this.alt" />
    </div>
  `,
  styleUrls: ['./tile.component.scss'],
})
export class ImageTileComponent extends TileComponent {
  @Input() src: string;
  @Input() alt: string;
}
