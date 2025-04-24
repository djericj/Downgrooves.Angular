import { Component, Input, OnInit } from '@angular/core';
import { Release } from 'src/app/models/release';
import { ReleaseTrack } from 'src/app/models/release.track';
import { NavigationService } from 'src/app/services/navigation.service';
import { PlayerService } from 'src/app/services/player.service';
import { BaseComponent } from '../../base.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ReleaseService } from 'src/app/services/release.service';

@Component({
    selector: 'app-release',
    templateUrl: './release.component.html',
    styleUrls: ['./release.component.scss'],
    standalone: false
})
export class ReleaseComponent extends BaseComponent implements OnInit {
  @Input() release: Release;
  public formattedReleaseDate: string;
  public backLink: string;
  public trackList: any = [];

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
          },
        });
      },
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
