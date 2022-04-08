import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Release } from 'src/app/models/release';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-release-list',
  templateUrl: './release.list.component.html',
  styleUrls: ['./release.list.component.scss'],
})
export class ReleaseListComponent implements OnInit {
  @Input() releases: Release[];
  @Input() path: string;
  public cdnUrl: string;
  constructor(private _configService: ConfigService) {
    this.cdnUrl = _configService.cdnUrl;
  }

  ngOnInit(): void {}
}
