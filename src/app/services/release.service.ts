import { Injectable } from '@angular/core';
import { Release } from '../models/release';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, map } from 'rxjs';
import { ITunesLookupResult } from '../models/itunes-lookup-result';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ReleaseService {
  public tracks: Release[] = [];
  public originals: Release[] = [];
  public remixes: Release[] = [];
  public error: boolean | undefined;
  public errorMessage: string | undefined;

  apiRoot = 'https://itunes.apple.com/search';
  lookupRoot = 'https://itunes.apple.com/lookup';
  constructor(private http: HttpClient, private _configService: ConfigService) {
    console.log(this._configService.apiUrl);
  }

  callback() {}

  getJson(): Observable<Release[]> {
    return this.http
      .get<Release[]>(`${this._configService.apiUrl}itunes/tracks`)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // https://itunes.apple.com/search?term=Downgrooves&limit=100&callback=JSONP_CALLBACK
  getData(uniqBy: string): Observable<Release[]> {
    return this.getJson().pipe(
      map(
        (data: any) => {
          return _.uniqBy(data as Release[], uniqBy).sort(
            (l: any, r: any): number => {
              if (l.releaseDate > r.releaseDate) {
                return -1;
              }
              if (l.releaseDate < r.releaseDate) {
                return 1;
              }
              return 0;
            }
          );
        },
        (err: HttpErrorResponse) => {
          this.error = true;
          if (err.error instanceof Error) {
            this.errorMessage = err.error.message;
            //console.log(this.errorMessage);
          }
        }
      )
    );
  }

  getOriginals(): Observable<Release[]> {
    return this.getData('trackCensoredName').pipe(
      map((data: any) => {
        return data.filter((element: any) => {
          return element.artistName.indexOf('Downgrooves') > -1;
        });
      })
    );
  }

  getRemixes(): Observable<Release[]> {
    return this.getData('trackCensoredName').pipe(
      map((data: any) => {
        return data.filter((element: any) => {
          return element.artistName.indexOf('Downgrooves') == -1;
        });
      })
    );
  }

  getAlbum(id: string) {
    const lookupUrl = `${this.lookupRoot}?id=${id}&entity=song`;
    return this.http.get<ITunesLookupResult>(lookupUrl);
  }
}
