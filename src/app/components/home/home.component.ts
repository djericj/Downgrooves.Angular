import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base/base.component';
import { Release } from '../../models/release';
import { ReleaseService } from '../../services/release.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  public tracks: Release[] = [];
  public error: boolean = false;
  public errorMessage: string = '';
  constructor(
    private _releaseService: ReleaseService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit(): void {
    this._releaseService
      .getData('collectionId')
      .subscribe((data: Release[]) => {
        this.tracks = data;
      });
  }

  getData(): Observable<Release[]> {
    return this._releaseService.getData('collectionId').pipe(
      map(
        (data: Release[]) => {
          return data;
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
