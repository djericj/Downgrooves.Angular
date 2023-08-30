import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ReleaseService } from '../../services/release.service';
import { Title } from '@angular/platform-browser';
import { Release } from 'src/app/models/release';
import { UrlFormatPipe } from 'src/app/pipes/url-format.pipe';
import { ArtistService } from 'src/app/services/artist.service';
import { Artist } from 'src/app/models/artist';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  public releases: Release[];
  public artist: Artist;
  constructor(
    private _artistService: ArtistService,
    private _releaseService: ReleaseService,
    private _urlFormat: UrlFormatPipe,
    private _titleService: Title,
    private _router: Router
  ) {
    super(_titleService);
  }

  ngOnInit(): void {
    this.getArtist();
    this.getReleases();
    this.setTitle('Home');
  }

  navigateTo = (args: any) => {
    var release = args as Release;
    let title = this._urlFormat.transform(release.title);
    return () => {
      this._router.navigateByUrl(`/release/${release.collectionId}/${title}`);
      return;
    };
  };

  getArtist() {
    this._artistService
      .getArtist('Downgrooves')
      .subscribe({ next: (artist: Artist) => (this.artist = artist) });
  }

  getReleases() {
    this._releaseService.getReleases('Downgrooves').subscribe({
      next: (data) => (this.releases = data),
    });
  }
}
