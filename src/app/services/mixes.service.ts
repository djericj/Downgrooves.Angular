import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mix } from '../models/mix';

@Injectable()
export class MixesService {
  error: any;
  mixes: any;
  apiUrl: string = '';
  constructor(private http: HttpClient, private _configService: ConfigService) {
    this.apiUrl = this._configService.apiUrl;
  }

  getMixes(): Observable<Mix[]> {
    return this.http.get<Mix[]>(`${this.apiUrl}mixes`);
  }

  getMix(name: string): Observable<Mix> {
    return this.getMixes().pipe(
      map((data: any) => {
        return data.find(
          (x: Mix) =>
            x.name.toUpperCase() == name.toUpperCase().replace(/-/gi, ' ')
        );
      })
    );
  }

  handleError(): string {
    return 'error';
  }
}
