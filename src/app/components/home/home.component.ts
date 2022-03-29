import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/shared/base/base.component';
import { ReleaseService } from '../../services/release.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http/http';
import { ReleaseCollection } from 'src/app/models/release-collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  public collections: ReleaseCollection[] = [];
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
      .getCollectionData('Downgrooves', 'collectionId')
      .subscribe((data: ReleaseCollection[]) => {
        this.collections = data;
      });
    this.setTitle('Home');
  }

  getData(): Observable<ReleaseCollection[]> {
    return this._releaseService
      .getCollectionData('Downgrooves', 'collectionId')
      .pipe(
        map(
          (data: ReleaseCollection[]) => {
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
