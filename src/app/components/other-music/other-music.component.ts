import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from '../shared/base/base.component';
import * as _ from 'lodash';
import { Release } from 'src/app/models/release';

@Component({
  selector: 'app-other-music',
  templateUrl: './other-music.component.html',
  styleUrls: ['./other-music.component.scss'],
})
export class OtherMusicComponent extends BaseComponent implements OnInit {
  public releases: Release[];
  public releases2: Release[];
  public error: boolean;
  public errorMessage: string;
  constructor(
    private _releaseService: ReleaseService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit() {
    this.setTitle('Other music');
    this.getData('Eric Rylos').subscribe({
      next: (data) => {
        this.releases = data;
      },
    });
    this.getData('Evotone').subscribe({
      next: (data) => {
        this.releases2 = data;
      },
    });
  }

  getData(artistName: string): Observable<Release[]> {
    return this._releaseService.getReleases(artistName);
  }
}
