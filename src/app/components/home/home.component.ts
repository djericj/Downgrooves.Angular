import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/shared/base/base.component';
import { ReleaseService } from '../../services/release.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http/http';
import { Release } from 'src/app/models/release';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  public releases: Release[];
  public error: boolean = false;
  public errorMessage: string = '';
  public cdnUrl: string;
  constructor(
    private _configService: ConfigService,
    private _releaseService: ReleaseService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit(): void {
    this.cdnUrl = this._configService.cdnUrl;
    this._releaseService.getReleases('Downgrooves').subscribe({
      next: (data) => (this.releases = data.filter((x) => x.isOriginal)),
    });
    this.setTitle('Home');
  }
}
