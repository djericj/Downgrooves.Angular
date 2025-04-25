import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxMasonryOptions, NgxMasonryModule } from 'ngx-masonry';
import { BaseComponent } from 'src/app/base.component';
import { ImageTileComponent } from '../../widgets/tiles/image-tile/image-tile.component';
import { NgClass } from '@angular/common';
import { HeaderTileComponent } from '../../widgets/tiles/header-tile/header-tile.component';
import { TextTileComponent } from '../../widgets/tiles/text-tile/text-tile.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [NgxMasonryModule, ImageTileComponent, NgClass, HeaderTileComponent, TextTileComponent]
})
export class ContactComponent extends BaseComponent implements OnInit {
  public myOptions: NgxMasonryOptions = {
    columnWidth: 320,
    itemSelector: '.grid-item',
    stamp: '.stamp',
  };
  constructor(public _titleService: Title) {
    super(_titleService);
  }

  ngOnInit(): void {
    this.setTitle('Contact us');
  }
}
