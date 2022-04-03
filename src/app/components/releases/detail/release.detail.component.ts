import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from 'src/app/components/shared/base/base.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { ReleaseCollection } from 'src/app/models/release-collection';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release.detail.component.html',
  styleUrls: ['./release.detail.component.scss'],
})
export class ReleaseDetailComponent extends BaseComponent implements OnInit {
  public collection: ReleaseCollection;

  constructor(
    private _route: ActivatedRoute,
    private _releaseService: ReleaseService,
    private _navigationService: NavigationService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

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

  back() {
    this._navigationService.back();
  }
}
