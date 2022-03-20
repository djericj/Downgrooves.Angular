import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-base',
  template: '',
})
export abstract class BaseComponent {
  private _siteTitle = 'Downgrooves Electronic Music';
  constructor(private titleService: Title) {}

  setTitle(title: string) {
    this.titleService.setTitle(title + ' | ' + this._siteTitle);
  }
}
