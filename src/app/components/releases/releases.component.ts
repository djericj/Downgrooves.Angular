import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Release } from 'src/app/models/release';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from 'src/app/components/shared/base/base.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss'],
})
export class ReleasesComponent extends BaseComponent implements OnInit {
  public releases: Release[];
  public error: boolean;
  public errorMessage: string;
  constructor(
    private _releaseService: ReleaseService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit() {
    this.setTitle('Original music');
    this._releaseService.getReleases('Downgrooves').subscribe({
      next: (data) => (this.releases = data.filter((x) => x.isOriginal)),
    });
  }
}
