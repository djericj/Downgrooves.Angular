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

@Component({
  selector: 'app-release-detail',
  templateUrl: './release.detail.component.html',
  styleUrls: ['./release.detail.component.scss'],
})
export class ReleaseDetailComponent extends BaseComponent implements OnInit {
  public tracks: Release[];
  public collection: ReleaseCollection;
  public formattedReleaseDate: string;
  public backLink: string;
  public cdnUrl: string;

  iTunesIcon = faItunesNote;
  arrowLeftIcon = faArrowLeft;
  previewButton = faPlayCircle;

  constructor(
    private _route: ActivatedRoute,
    private _configService: ConfigService,
    private _releaseService: ReleaseService,
    private _playerService: PlayerService,
    private _navigationService: NavigationService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit() {
    this.cdnUrl = this._configService.cdnUrl;
    this.getCollection();
    this.getCollectionTracks();
  }

  play(release: Release) {
    this._playerService.playRelease(release);
  }

  getCollection() {
    this._route.params.subscribe((params) => {
      const collectionId = params['id'];
      this._releaseService.getCollection(collectionId).subscribe((data) => {
        this.collection = data;
      });
    });
  }

  getCollectionTracks() {
    this._route.params.subscribe((params) => {
      const collectionId = params['id'];
      this._releaseService
        .getTracksForCollecton(collectionId)
        .subscribe((data) => {
          this.tracks = data;
        });
    });
  }

  back() {
    this._navigationService.back();
  }
}
