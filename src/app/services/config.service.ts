import { Injectable } from '@angular/core';
import configJson from '../../assets/config.json';

@Injectable()
export class ConfigService {
  private appConfig: any;

  constructor() {}

  loadAppConfig() {
    this.appConfig = configJson;
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
