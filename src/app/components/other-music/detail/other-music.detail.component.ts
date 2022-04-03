import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReleaseCollection } from 'src/app/models/release-collection';
import { ReleaseService } from 'src/app/services/release.service';

@Component({
  selector: 'app-other-music-detail',
  templateUrl: './other-music.detail.component.html',
  styleUrls: ['./other-music.detail.component.scss'],
})
export class OtherMusicDetailComponent implements OnInit {
  public collection: ReleaseCollection;
  constructor(
    private _route: ActivatedRoute,
    private _releaseService: ReleaseService
  ) {}

  ngOnInit() {
    this.getCollection();
  }

  getCollection() {
    this._route.params.subscribe((params) => {
      const collectionId = params['id'];
      this._releaseService.getCollection(collectionId).subscribe((data) => {
        this.collection = data;
      });
    });
  }
}
