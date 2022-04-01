import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from 'src/app/components/shared/base/base.component';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'lodash';
import { Release } from 'src/app/models/release';

@Component({
  selector: 'app-remixes',
  templateUrl: './remixes.component.html',
  styleUrls: ['./remixes.component.scss'],
})
export class RemixesComponent extends BaseComponent implements OnInit {
  public tracks: Observable<Release[]>;
  public error: boolean;
  public errorMessage: string;
  constructor(
    private _releaseService: ReleaseService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit(): void {
    this.tracks = this.getData();
    this.setTitle('Remixes');
  }

  getData(): Observable<Release[]> {
    return this._releaseService.getRemixTracks('Downgrooves').pipe(
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
