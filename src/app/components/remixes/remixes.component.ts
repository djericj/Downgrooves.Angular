import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from 'src/app/components/shared/base/base.component';
import * as _ from 'lodash';
import { Release } from 'src/app/models/release';

@Component({
  selector: 'app-remixes',
  templateUrl: './remixes.component.html',
  styleUrls: ['./remixes.component.scss'],
})
export class RemixesComponent extends BaseComponent implements OnInit {
  public releases: Release[];
  public error: boolean;
  constructor(
    private _releaseService: ReleaseService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit(): void {
    this.setTitle('Remixes');
    this._releaseService.getReleases().subscribe({
      next: (data) => (this.releases = data.filter((x) => x.isRemix)),
      error: (e) => (this.error = e),
    });
  }
}
