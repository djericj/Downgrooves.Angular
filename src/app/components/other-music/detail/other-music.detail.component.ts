import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Release } from 'src/app/models/release';
import { ReleaseService } from 'src/app/services/release.service';

@Component({
  selector: 'app-other-music-detail',
  templateUrl: './other-music.detail.component.html',
  styleUrls: ['./other-music.detail.component.scss'],
})
export class OtherMusicDetailComponent implements OnInit {
  public release: Release;
  constructor(
    private _route: ActivatedRoute,
    private _releaseService: ReleaseService
  ) {}

  ngOnInit() {
    this.getCollection();
  }

  getCollection() {
    this._route.params.subscribe({
      next: (params) => {
        const collectionId = params['collectionId'];
        this._releaseService
          .getRelease(collectionId)
          .subscribe({ next: (data) => (this.release = data) });
      },
    });
  }
}
