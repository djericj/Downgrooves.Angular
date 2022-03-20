import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Release } from 'src/app/models/release';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css'],
})
export class ReleasesComponent extends BaseComponent implements OnInit {
  public tracks: Observable<Release[]>;
  public error: boolean;
  public errorMessage: string;
  constructor(
    private _releaseService: ReleaseService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit() {
    this.tracks = this.getData();
    this.setTitle('Original releases');
  }

  getData(): Observable<Release[]> {
    return this._releaseService.getOriginals().pipe(
      map(
        (data) => {
          return _.uniqBy(data as Release[], 'collectionId');
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
