import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ReleaseService } from '../../services/release.service';
import { Title } from '@angular/platform-browser';
import { Release } from 'src/app/models/release';
import { UrlFormatPipe } from 'src/app/pipes/url-format.pipe';
import { ArtistService } from 'src/app/services/artist.service';
import { Artist } from 'src/app/models/artist';
import { Router } from '@angular/router';
import { NgxMasonryModule } from 'ngx-masonry';
import { HeaderTileComponent } from '../../widgets/tiles/header-tile/header-tile.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TextTileComponent } from '../../widgets/tiles/text-tile/text-tile.component';
import { ImageTileComponent } from '../../widgets/tiles/image-tile/image-tile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [NgxMasonryModule, HeaderTileComponent, NgClass, NgFor, NgIf, TextTileComponent, ImageTileComponent]
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
      next: (data: Release[]) => (this.releases = data.slice(0, 16)),
    });
  }

  getSubtitle() {
    if (this.artist)
      return this.artist.description
    else
      return "";
  }
}
