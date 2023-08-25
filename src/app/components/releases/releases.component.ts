import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Release } from 'src/app/models/release';
import { ReleaseService } from 'src/app/services/release.service';
import { BaseComponent } from 'src/app/components/shared/base/base.component';
import * as _ from 'lodash';
import { UrlFormatPipe } from 'src/app/pipes/url-format.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReleasesComponent extends BaseComponent implements OnInit {
  public originals: boolean;
  public releases: Release[];
  public error: boolean;
  public errorMessage: string;
  constructor(
    private _activatedRouteService: ActivatedRoute,
    private _releaseService: ReleaseService,
    private _urlFormat: UrlFormatPipe,
    private _titleService: Title,
    private _router: Router
  ) {
    super(_titleService);
  }

  ngOnInit() {
    this._activatedRouteService.data.subscribe((data) => {
      this.originals = data['kind'] == 'original';
      this.setTitle(this.originals ? 'Original music' : 'Remixes');
      this._releaseService.getReleases('Downgrooves').subscribe({
        next: (data) =>
          (this.releases = data.filter((x) =>
            this.originals ? x.isOriginal : x.isRemix
          )),
      });
    });
  }

  navigateTo = (args: any) => {
    var release = args as Release;
    let title = this._urlFormat.transform(release.title);
    return () => {
      this._router.navigateByUrl(
        `/${this.originals ? 'release' : 'remix'}/${
          release.collectionId
        }/${title}`
      );
      return;
    };
  };
}
