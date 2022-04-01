import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Release } from 'src/app/models/release';
import { PlayerService } from 'src/app/services/player.service';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from 'src/app/components/shared/base/base.component';
import { faItunesNote } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from 'src/app/services/navigation.service';
import { ReleaseCollection } from 'src/app/models/release-collection';
import { ConfigService } from 'src/app/services/config.service';
import { ItunesService } from 'src/app/services/itunes.service';
import { ITunesResult } from 'src/app/models/itunes-result';

@Component({
  selector: 'app-remix-detail',
  templateUrl: './remix.detail.component.html',
  styleUrls: ['./remix.detail.component.scss'],
})
export class RemixDetailComponent extends BaseComponent implements OnInit {
  public results: ITunesResult[];
  public collection: ITunesResult;
  public tracks: ITunesResult[];
  public formattedReleaseDate: string;
  public backLink: string;
  public cdnUrl: string;

  iTunesIcon = faItunesNote;
  arrowLeftIcon = faArrowLeft;
  previewButton = faPlayCircle;

  constructor(
    private _route: ActivatedRoute,
    private _playerService: PlayerService,
    private _navigationService: NavigationService,
    private _iTunesService: ItunesService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit() {
    this.getTrack();
  }

  play(release: Release) {
    this._playerService.playRelease(release);
  }

  getTrack() {
    this._route.params.subscribe((params) => {
      const trackId = params['id'];
      this._iTunesService.getTrack(trackId).subscribe((data) => {
        this.results = data['results'];
        this.collection = this.results.filter(
          (x) => x.wrapperType == 'collection'
        )[0];
        this.tracks = this.results.filter((x) => x.wrapperType == 'track');
      });
    });
  }

  back() {
    this._navigationService.back();
  }
}
