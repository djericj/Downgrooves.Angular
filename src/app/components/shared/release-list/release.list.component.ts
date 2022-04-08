import { Component, Input } from '@angular/core';
import { Release } from 'src/app/models/release';
import { UrlFormatPipe } from 'src/app/pipes/url-format.pipe';

@Component({
  selector: 'app-release-list',
  templateUrl: './release.list.component.html',
  styleUrls: ['./release.list.component.scss'],
})
export class ReleaseListComponent {
  @Input() releases: Release[];
  @Input() path: string;
  constructor(private _urlFormat: UrlFormatPipe) {}

  navigateTo(release: Release, path: string) {
    let title = this._urlFormat.transform(release.title);
    return `/${path}/${release.collectionId}/${title}`;
  }
}
