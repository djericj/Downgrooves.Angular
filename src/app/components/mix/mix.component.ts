import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Mix } from 'src/app/models/mix';
import { MixesService } from 'src/app/services/mixes.service';
import { PlayerService } from 'src/app/services/player.service';
import { BaseComponent } from 'src/app/components/shared/base/base.component';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss'],
})
export class MixComponent extends BaseComponent implements OnInit {
  public mix: Mix;
  songs: Array<any>;
  constructor(
    private _route: ActivatedRoute,
    private _mixesService: MixesService,
    private _navigationService: NavigationService,
    private _titleService: Title,
    private _playerService: PlayerService
  ) {
    super(_titleService);
  }

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params) => {
        const mixId = params['mixId'];
        this._mixesService
          .getMix(mixId)
          .subscribe({ next: (data: Mix) => (this.mix = data) });
      },
    });
  }

  play(mix: Mix) {
    this._playerService.playMix(mix);
  }

  back() {
    this._navigationService.back();
  }
}
