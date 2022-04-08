import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { Mix } from '../models/mix';

@Injectable()
export class MixesService {
  error: any;
  mixes: Mix[];
  apiUrl: string = '';
  constructor(private http: HttpClient, private _configService: ConfigService) {
    this.apiUrl = this._configService.apiUrl;
  }

  getMixes(): Observable<Mix[]> {
    return this.http.get<Mix[]>(`${this.apiUrl}mixes`);
  }

  getMixesByCategory(category: string): Observable<Mix[]> {
    return this.http.get<Mix[]>(
      `${this.apiUrl}mixes/category?category=${category}`
    );
  }

  getMix(id: number): Observable<Mix> {
    return this.http.get<Mix>(`${this.apiUrl}mix/${id}`);
  }

  handleError(): string {
    return 'error';
  }
}
