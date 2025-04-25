import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app.config';

@Injectable()
export class ConfigService {
  private appConfig: any;
  private httpClient: HttpClient;
  loaded = false;

  // use HttpBackend here to bypass the AuthInterceptor.  AuthInterceptor needs the config file loaded before it can work properly.
  // ref:  https://stackoverflow.com/questions/46469349/how-to-make-an-angular-module-to-ignore-http-interceptor-added-in-a-core-module/49013534#49013534
  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  loadAppConfig(): Promise<void> {
    return this.httpClient
      .get<AppConfig>('/assets/config.json')
      .toPromise()
      .then((data) => {
        this.appConfig = data;
        this.loaded = true;
      })
  }

  get apiUrl() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.apiUrl;
  }

  get token() {
    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.token;
  }
}
