import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { Title } from '@angular/platform-browser';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faSoundcloud, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent extends BaseComponent implements OnInit {
  soundcloudIcon = faSoundcloud;
  spotifyIcon = faSpotify;
  youtubeIcon = faYoutube;
  constructor(private _titleService: Title) {
    super();
    this._titleService.setTitle('Shop | ' + this.SiteTitle);
  }
}
