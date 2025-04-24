import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppConfig } from '../models/app.config';

@Injectable()
export class ConfigService {
  appConfig$: BehaviorSubject<AppConfig>;
  private httpClient: HttpClient;

  // use HttpBackend here to bypass the AuthInterceptor.  AuthInterceptor needs the config file loaded before it can work properly.
  // ref:  https://stackoverflow.com/questions/46469349/how-to-make-an-angular-module-to-ignore-http-interceptor-added-in-a-core-module/49013534#49013534
  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  async loadAppConfig() {
    await this.httpClient
      .get<AppConfig>('/assets/config.json').subscribe((data) => {
        this.appConfig$ = new BehaviorSubject<AppConfig>(data)
        //this.appConfig$.next(data);
        console.log("Loaded config successfully.");
      });
  }

  get apiUrl() {
    if (!this.appConfig$) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig$.value.apiUrl;
  }

  get token() {
    if (!this.appConfig$) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig$.value.token;
  }
}
