import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITunesLookupResult } from '../models/itunes-lookup-result';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ItunesService {
  lookupRoot = 'https://itunes.apple.com/lookup';
  constructor(
    private http: HttpClient,
    private _configService: ConfigService
  ) {}

  getTrack(trackId: number) {
    const lookupUrl = `${this.lookupRoot}?id=${trackId}&entity=song`;
    return this.http.get<ITunesLookupResult>(lookupUrl);
  }
}
