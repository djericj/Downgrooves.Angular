import { Component, Input, OnInit } from '@angular/core';
import { Release } from 'src/app/models/release';
import { NavigationService } from 'src/app/services/navigation.service';
import { PlayerService } from 'src/app/services/player.service';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ReleaseService } from 'src/app/services/release.service';
import { NgIf, NgFor } from '@angular/common';
import { ImageTileComponent } from '../../widgets/tiles/image-tile/image-tile.component';
import { HeaderTileComponent } from '../../widgets/tiles/header-tile/header-tile.component';
import { ButtonComponent } from '../../widgets/button/button.component';
import { TracklistComponent } from '../../widgets/tracklist/tracklist.component';
import { KeyValueComponent } from '../../widgets/key-value/key-value.component';
import { FormatReleaseDatePipe } from '../../pipes/format-release-date.pipe';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, ImageTileComponent, HeaderTileComponent, ButtonComponent, TracklistComponent, KeyValueComponent, FormatReleaseDatePipe]
})
export class ReleaseComponent extends BaseComponent implements OnInit {
  @Input() release: Release;
  public formattedReleaseDate: string;
  public backLink: string;
  public trackList: any = [];
  public moreReleases: any = [];
  public showMoreReleases: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _playerService: PlayerService,
    private _navigationService: NavigationService,
    private _titleService: Title,
    private _releaseService: ReleaseService
  ) {
    super(_titleService);
  }

  ngOnInit() {
    this.getCollection();
  }

  getCollection() {
    this._route.params.subscribe({
      next: (params) => {
        const collectionId = params['collectionId'];

        this._releaseService.getRelease(collectionId).subscribe({
          next: (data: Release) => {
            this.release = data;

            this.release.tracks.forEach((t) => {
              if (this.trackList)
                this.trackList.push({
                  id: t.id,
                  title: t.title,
                  trackNumber: t.trackNumber,
                  artistName: t.artistName,
                  url: t.previewUrl,
                  playFunc: () => this._playerService.playRelease(t),
                });
            });

            this.showMoreReleases = this.trackList.length <= 5;

            if (this.showMoreReleases)
              this.getMoreReleases();
          },
        });
      },
    });
  }

  getMoreReleases() {
    this._releaseService.getReleases('Downgrooves').subscribe({
      next: (data) => {
        this.moreReleases = data.slice(0, 5);
        console.log(this.moreReleases);
      }
    });
  }

  navigateTo = (args: any) => {
    return () => {
      window.open(args);
      return;
    };
  };

  back() {
    this._navigationService.back();
  }
}
