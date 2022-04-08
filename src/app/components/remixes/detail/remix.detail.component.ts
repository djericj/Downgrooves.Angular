import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Release } from 'src/app/models/release';
import { PlayerService } from 'src/app/services/player.service';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from 'src/app/components/shared/base/base.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { ReleaseTrack } from 'src/app/models/release.track';

@Component({
  selector: 'app-remix-detail',
  templateUrl: './remix.detail.component.html',
  styleUrls: ['./remix.detail.component.scss'],
})
export class RemixDetailComponent extends BaseComponent implements OnInit {
  public release: Release;

  constructor(
    private _route: ActivatedRoute,
    private _playerService: PlayerService,
    private _navigationService: NavigationService,
    private _releaseService: ReleaseService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit() {
    this.getTrack();
  }

  play(releaseTrack: ReleaseTrack) {
    this._playerService.playRelease(releaseTrack);
  }

  getTrack() {
    this._route.params.subscribe({
      next: (params) => {
        const collectionId = params['collectionId'];
        this._releaseService
          .getRelease(collectionId)
          .subscribe({ next: (data: Release) => (this.release = data) });
      },
    });
  }

  back() {
    this._navigationService.back();
  }
}
