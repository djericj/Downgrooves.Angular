import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class ModularService {
  constructor(private http: HttpClient) {}

  callback() {}

  getJson(): Observable<any> {
    return this.http.get<any>('../../assets/youtube.playlist.json').pipe(
      map((data: any) => {
        console.log(data);
        return data;
      })
    );
  }
}
