import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable()
export class VideoService {
  constructor(
    private http: HttpClient,
    private _configService: ConfigService
  ) {}

  getJson(): Observable<any> {
    return this.http.get<any>(`${this._configService.apiUrl}videos`).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
}
