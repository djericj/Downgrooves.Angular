import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
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
