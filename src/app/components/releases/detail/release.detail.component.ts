import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Release } from 'src/app/models/release';
import { PlayerService } from 'src/app/services/player.service';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { faItunesNote } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release.detail.component.html',
  styleUrls: ['./release.detail.component.scss'],
})
export class ReleaseDetailComponent extends BaseComponent implements OnInit {
  public releases: Release[];
  public release: Release;
  public formattedReleaseDate: string;

  iTunesIcon = faItunesNote;
  arrowLeftIcon = faArrowLeft;
  previewButton = faPlayCircle;

  constructor(
    private _route: ActivatedRoute,
    private _releaseService: ReleaseService,
    private _playerService: PlayerService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit() {
    this.getDetail();
  }

  play(release: Release) {
    this._playerService.playRelease(release);
  }

  getDetail() {
    this._route.params.subscribe((params) => {
      const collectionId = params['id'];
      this._releaseService.getAlbum(collectionId).subscribe((data) => {
        this.releases = data.results.filter((x) => x.kind == 'song');
        this.release = data.results[0];
        this.formattedReleaseDate = moment(this.release.trackTimeMillis).format(
          'MMM YYYY'
        );
      });
    });
  }
}
