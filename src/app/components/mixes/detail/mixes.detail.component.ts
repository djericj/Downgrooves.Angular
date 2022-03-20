import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Mix } from 'src/app/models/mix';
import { MixesService } from 'src/app/services/mixes.service';
import { PlayerService } from 'src/app/services/player.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { faHeadphones, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mixes.detail',
  templateUrl: './mixes.detail.component.html',
  styleUrls: ['./mixes.detail.component.css'],
})
export class MixesDetailComponent extends BaseComponent implements OnInit {
  public mix: Mix;
  headphonesIcon = faHeadphones;
  arrowLeftIcon = faArrowLeft;
  songs: Array<any>;
  constructor(
    private _route: ActivatedRoute,
    private _mixesService: MixesService,
    private _titleService: Title,
    private _playerService: PlayerService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getDetail();
  }

  playMix() {
    let track = this._playerService.mixToPlayerTrack(this.mix);
    this._playerService.play(track);
  }
  downloadMix() {}

  getDetail() {
    this._route.params.subscribe((params) => {
      const name = params['name'];
      this._mixesService.getMix(name).subscribe((data) => {
        this.mix = data;
        this.mix.createDate = moment(this.mix.createDate).format('MMM YYYY');
        //console.log(this.mix);
        this._titleService.setTitle(
          this.mix.name +
            ' mixed by ' +
            this.mix.artist +
            ' | ' +
            this.SiteTitle
        );
      });
    });
  }
}
