import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Artist } from '../models/artist';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  apiUrl: string = '';
  constructor(private http: HttpClient, private _configService: ConfigService) { 
    this.apiUrl = this._configService.apiUrl;
  }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiUrl}artists`);
  }

  getArtist(name: string): Observable<Artist> {
    return this.getArtists().pipe(map(artists => (artists.filter((x:Artist) => x.name === name)[0])));
  }  
}
