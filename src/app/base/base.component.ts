import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export abstract class BaseComponent implements OnInit {
  private _siteTitle = 'Downgrooves Electronic Music';

  public SiteTitle() {
    return this._siteTitle;
  }

  constructor() {}

  ngOnInit(): void {}
}
