import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mix } from 'src/app/models/mix';
import { NgxMasonryOptions } from 'ngx-masonry';
import { faHeadphones, faList } from '@fortawesome/free-solid-svg-icons';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-mix-list',
  templateUrl: './mix.list.component.html',
  styleUrls: ['./mix.list.component.scss'],
})
export class MixListComponent implements OnInit {
  @Input() mixes: Observable<Mix[]>;
  headphonesIcon = faHeadphones;
  listIcon = faList;
  constructor(private _playerService: PlayerService) {}

  public options: NgxMasonryOptions = {
    columnWidth: 320,
    itemSelector: '.grid-item',
    stamp: '.stamp',
  };

  ngOnInit(): void {}

  playMix(mix: Mix) {
    this._playerService.playMix(mix);
  }
}
