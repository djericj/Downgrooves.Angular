import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from 'src/app/components/shared/base/base.component';
import { NavigationService } from 'src/app/services/navigation.service';
import { Release } from 'src/app/models/release';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release.detail.component.html',
  styleUrls: ['./release.detail.component.scss'],
})
export class ReleaseDetailComponent extends BaseComponent implements OnInit {
  public release: Release;

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
