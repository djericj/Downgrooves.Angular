import { Injectable } from '@angular/core';
import { Release } from '../models/release';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, map } from 'rxjs';
import { ITunesLookupResult } from '../models/itunes-lookup-result';
import * as _ from 'lodash';
import { ReleaseCollection } from '../models/release-collection';

@Injectable({
  providedIn: 'root',
})
export class ReleaseService {
  public tracks: Release[] = [];
  public originals: Release[] = [];
  public remixes: Release[] = [];
  public error: boolean | undefined;
  public errorMessage: string | undefined;

  constructor(private http: HttpClient, private _configService: ConfigService) {
    console.log(this._configService.apiUrl);
  }

  callback() {}

  getTrack(trackId: number): Observable<Release> {
    return this.http
      .get<Release>(`${this._configService.apiUrl}itunes/track/${trackId}`)
      .pipe(
        map((data: any) => {
          return data[0];
        })
      );
  }

  getTracks(): Observable<Release[]> {
    return this.http
      .get<Release[]>(`${this._configService.apiUrl}itunes/tracks`)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getTracksForCollecton(collectionId: number): Observable<Release[]> {
    return this.http
      .get<Release[]>(
        `${this._configService.apiUrl}itunes/tracks/collection/${collectionId}`
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  getCollection(collectionId: number): Observable<ReleaseCollection> {
    return this.http
      .get<ReleaseCollection>(
        `${this._configService.apiUrl}itunes/collection/${collectionId}`
      )
      .pipe(
        map((data: any) => {
          return data[0];
        })
      );
  }

  getCollections(artistName: string): Observable<ReleaseCollection[]> {
    return this.http
      .get<ReleaseCollection[]>(
        `${this._configService.apiUrl}itunes/collections?artistName=${artistName}`
      )
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  // https://itunes.apple.com/search?term=Downgrooves&limit=100&callback=JSONP_CALLBACK
  getTrackData(uniqBy: string): Observable<Release[]> {
    return this.getTracks().pipe(
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

  getCollectionData(
    artistName: string,
    uniqBy: string
  ): Observable<ReleaseCollection[]> {
    return this.getCollections(artistName).pipe(
      map(
        (data: any) => {
          return _.uniqBy(data as ReleaseCollection[], uniqBy).sort(
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

  getOriginalTracks(artistName: string): Observable<Release[]> {
    return this.getTrackData('trackName').pipe(
      map((data: any) => {
        return data.filter((element: any) => {
          return element.artistName.indexOf('Downgrooves') > -1;
        });
      })
    );
  }

  getRemixTracks(artistName: string): Observable<Release[]> {
    return this.getTrackData('trackName').pipe(
      map((data: any) => {
        console.log(data);
        return data.filter((element: any) => {
          return element.trackCensoredName.indexOf('Downgrooves') > -1;
        });
      })
    );
  }
}
