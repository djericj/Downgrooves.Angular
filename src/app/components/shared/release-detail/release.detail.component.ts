import { Component, Input } from '@angular/core';
import { Release } from 'src/app/models/release';
import { ReleaseTrack } from 'src/app/models/release.track';
import { NavigationService } from 'src/app/services/navigation.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-release-detail-control',
  templateUrl: './release.detail.component.html',
  styleUrls: ['./release.detail.component.scss'],
})
export class ReleaseDetailControlComponent {
  @Input() release: Release;
  public formattedReleaseDate: string;
  public backLink: string;

  constructor(
    private _playerService: PlayerService,
    private _navigationService: NavigationService
  ) {}

  play(releaseTrack: ReleaseTrack) {
    this._playerService.playRelease(releaseTrack);
  }

  back() {
    this._navigationService.back();
  }
}
