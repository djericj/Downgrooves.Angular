import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../components/shared/base/base.component';
import { ReleaseService } from '../../services/release.service';
import { Title } from '@angular/platform-browser';
import { Release } from 'src/app/models/release';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  public releases: Release[];
  public error: boolean = false;
  public errorMessage: string = '';
  constructor(
    private _releaseService: ReleaseService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit(): void {
    this._releaseService.getReleases('Downgrooves').subscribe({
      next: (data) => (this.releases = data.filter((x) => x.isOriginal)),
    });
    this.setTitle('Home');
  }
}
