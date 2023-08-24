import { Component, Input } from '@angular/core';
import { Mix } from 'src/app/models/mix';
import { NgxMasonryOptions } from 'ngx-masonry';
import { PlayerService } from 'src/app/services/player.service';
import { UrlFormatPipe } from 'src/app/pipes/url-format.pipe';

@Component({
  selector: 'app-mix-list',
  templateUrl: './mix.list.component.html',
  styleUrls: ['./mix.list.component.scss'],
})
export class MixListComponent {
  @Input() mixes: Mix[];
  constructor(
    private _playerService: PlayerService,
    private _urlFormat: UrlFormatPipe
  ) {}

  public options: NgxMasonryOptions = {
    columnWidth: 320,
    itemSelector: '.grid-item',
    stamp: '.stamp',
  };

  playMix(mix: Mix) {
    this._playerService.playMix(mix);
  }

  navigateTo(mix: Mix) {
    let title = this._urlFormat.transform(mix.title);
    return `/mix/${mix.MixId}/${title}`;
  }
}
