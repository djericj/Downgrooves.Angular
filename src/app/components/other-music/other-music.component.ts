import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from '../shared/base/base.component';
import * as _ from 'lodash';
import { Release } from 'src/app/models/release';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-other-music',
  templateUrl: './other-music.component.html',
  styleUrls: ['./other-music.component.scss'],
})
export class OtherMusicComponent extends BaseComponent implements OnInit {
  public releases: Release[];
  public releases2: Release[];
  public error: boolean;
  public errorMessage: string;
  public artists: Artist[] = [];
  constructor(
    private _artistService: ArtistService,
    private _releaseService: ReleaseService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit() {
    this.setTitle('Other music');
    this.getArtists();
  }

  getData(artistName: string): Observable<Release[]> {
    return this._releaseService.getReleases(artistName);
  }

  getArtists() {
    this._artistService.getArtists().subscribe({
      next: (artists: Artist[]) => {
        this.artists = artists.filter(
          (x) => x.name === 'Eric Rylos' || x.name === 'Evotone'
        );
      },
      complete: () => this.getReleases(),
    });
  }

  getReleases() {
    for (let artist of this.artists) {
      console.log(artist);
      this.getData(artist.name).subscribe({
        next: (data) => {
          artist.releases = data;
        },
      });
    }
  }
}
