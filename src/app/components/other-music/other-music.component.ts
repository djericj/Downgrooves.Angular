import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { ReleaseCollection } from 'src/app/models/release-collection';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from '../shared/base/base.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-other-music',
  templateUrl: './other-music.component.html',
  styleUrls: ['./other-music.component.scss'],
})
export class OtherMusicComponent extends BaseComponent implements OnInit {
  public collections: Observable<ReleaseCollection[]>;
  public collections2: Observable<ReleaseCollection[]>;
  public error: boolean;
  public errorMessage: string;
  constructor(
    private _releaseService: ReleaseService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit() {
    this.collections = this.getData('Eric Rylos');
    this.collections2 = this.getData('Evotone');
    this.setTitle('Other music');
  }

  getData(artistName: string): Observable<ReleaseCollection[]> {
    return this._releaseService.getCollections(artistName).pipe(
      map(
        (data) => {
          return _.uniqBy(data as ReleaseCollection[], 'collectionId');
        },
        (err: HttpErrorResponse) => {
          this.error = true;
          if (err.error instanceof Error) {
            this.errorMessage = err.error.message;
          }
        }
      )
    );
  }
}
