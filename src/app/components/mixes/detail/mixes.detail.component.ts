import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Mix } from 'src/app/models/mix';
import { MixesService } from 'src/app/services/mixes.service';
import { PlayerService } from 'src/app/services/player.service';
import { BaseComponent } from 'src/app/components/shared/base/base.component';
import { faHeadphones, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-mixes.detail',
  templateUrl: './mixes.detail.component.html',
  styleUrls: ['./mixes.detail.component.scss'],
})
export class MixesDetailComponent extends BaseComponent implements OnInit {
  public mix: Mix;
  headphonesIcon = faHeadphones;
  arrowLeftIcon = faArrowLeft;
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
