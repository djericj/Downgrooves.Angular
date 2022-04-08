import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mix } from 'src/app/models/mix';
import { NgxMasonryOptions } from 'ngx-masonry';
import { faHeadphones, faList } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';
import { UrlFormatPipe } from 'src/app/pipes/url-format.pipe';

@Component({
  selector: 'app-mix-list',
  templateUrl: './mix.list.component.html',
  styleUrls: ['./mix.list.component.scss'],
})
export class MixListComponent implements OnInit {
  @Input() mixes: Mix[];
  headphonesIcon = faHeadphones;
  listIcon = faList;
  constructor(
    private _playerService: PlayerService,
    private _urlFormat: UrlFormatPipe
  ) {}

  public options: NgxMasonryOptions = {
    columnWidth: 320,
    itemSelector: '.grid-item',
    stamp: '.stamp',
  };

  ngOnInit(): void {}

  playMix(mix: Mix) {
    this._playerService.playMix(mix);
  }

  navigateTo(mix: Mix) {
    let title = this._urlFormat.transform(mix.title);
    return `/mix/${mix.mixId}/${title}`;
  }
}
