import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Video } from '../models/video';

@Injectable()
export class VideoService {
  constructor(
    private http: HttpClient,
    private _configService: ConfigService
  ) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this._configService.apiUrl}videos`);
  }
}
