import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/shared/base/base.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent extends BaseComponent implements OnInit {
  constructor(private _titleService: Title) {
    super(_titleService);
  }

  ngOnInit(): void {
    this.setTitle('Shop');
  }
}
