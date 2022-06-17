import { Injectable } from '@angular/core';
import { Release } from '../models/release';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable, map } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ReleaseService {
  constructor(
    private http: HttpClient,
    private _configService: ConfigService
  ) {}

  callback() {}

  getReleases(artistName?: string): Observable<Release[]> {
    let url = `${this._configService.apiUrl}releases`;
    if (artistName) url = url + `?artistName=${artistName}`;
    return this.http.get<Release[]>(url).pipe(
      map((data: Release[]) => {
        return data;
      })
    );
  }

  getRelease(collectionId: number): Observable<Release> {
    return this.http
      .get<Release>(
        `${this._configService.apiUrl}release/collection/${collectionId}`
      )
      .pipe(
        map((data: Release) => {
          return data;
        })
      );
  }
}
