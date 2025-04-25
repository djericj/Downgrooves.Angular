import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Mix } from 'src/app/models/mix';
import { MixesService } from 'src/app/services/mixes.service';
import { PlayerService } from 'src/app/services/player.service';
import { BaseComponent } from 'src/app/base.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { NgIf } from '@angular/common';
import { ImageTileComponent } from '../../widgets/tiles/image-tile/image-tile.component';
import { HeaderTileComponent } from '../../widgets/tiles/header-tile/header-tile.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { TracklistComponent } from '../../widgets/tracklist/tracklist.component';
import { FormatReleaseDatePipe } from '../../pipes/format-release-date.pipe';

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss'],
  standalone: true,
  imports: [NgIf, ImageTileComponent, HeaderTileComponent, ButtonComponent, TracklistComponent, FormatReleaseDatePipe]
})
export class MixComponent extends BaseComponent implements OnInit {
  public mix: Mix;
  public trackList: any = [];

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
        this._mixesService.getMix(mixId).subscribe({
          next: (data: Mix) => {
            this.mix = data;

            this.mix.tracks.forEach((t) => {
              if (this.trackList)
                this.trackList.push({
                  id: t.trackId,
                  title: `${t.title} ${t.remix ? ' (' + t.remix + ')' : ''}`,
                  trackNumber: t.number,
                  artistName: t.artist,
                  label: t.label,
                });
            });
          },
        });
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
