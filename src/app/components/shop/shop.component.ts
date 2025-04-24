import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';
import { NgxMasonryOptions, NgxMasonryModule } from 'ngx-masonry';
import { HeaderTileComponent } from '../../widgets/tiles/header-tile/header-tile.component';
import { NgClass } from '@angular/common';
import { ImageTileComponent } from '../../widgets/tiles/image-tile/image-tile.component';
import { TextTileComponent } from '../../widgets/tiles/text-tile/text-tile.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  standalone: true,
  imports: [NgxMasonryModule, HeaderTileComponent, NgClass, ImageTileComponent, TextTileComponent]
})
export class ShopComponent extends BaseComponent implements OnInit {
  public myOptions: NgxMasonryOptions = {
    columnWidth: 320,
    itemSelector: '.grid-item',
    stamp: '.stamp',
  };

  constructor(private _titleService: Title) {
    super(_titleService);
  }

  ngOnInit(): void {
    this.setTitle('Shop');
  }
}
