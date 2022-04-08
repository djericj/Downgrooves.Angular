import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable()
export class ConfigService {
  private appConfig: any;
  private httpClient: HttpClient;

  // use HttpBackend here to bypass the AuthInterceptor.  AuthInterceptor needs the config file loaded before it can work properly.
  // ref:  https://stackoverflow.com/questions/46469349/how-to-make-an-angular-module-to-ignore-http-interceptor-added-in-a-core-module/49013534#49013534
  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  loadAppConfig() {
    return this.httpClient
      .get('/assets/config.json')
      .toPromise()
      .then((data: any) => {
        this.appConfig = data;
      });
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
