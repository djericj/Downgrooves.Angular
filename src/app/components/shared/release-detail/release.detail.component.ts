import { Component, OnInit, Input } from '@angular/core';
import { faItunesNote } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { Release } from 'src/app/models/release';
import { ReleaseCollection } from 'src/app/models/release-collection';
import { ConfigService } from 'src/app/services/config.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-release-detail-control',
  templateUrl: './release.detail.component.html',
  styleUrls: ['./release.detail.component.scss'],
})
export class ReleaseDetailControlComponent implements OnInit {
  @Input() collection: ReleaseCollection;
  @Input() path: string;
  public tracks: Release[];
  public formattedReleaseDate: string;
  public backLink: string;
  public cdnUrl: string;

  iTunesIcon = faItunesNote;
  arrowLeftIcon = faArrowLeft;
  previewButton = faPlayCircle;

  constructor(
    private _configService: ConfigService,
    private _playerService: PlayerService,
    private _navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.cdnUrl = this._configService.cdnUrl;
  }

  play(release: Release) {
    this._playerService.playRelease(release);
  }

  back() {
    this._navigationService.back();
  }
}
