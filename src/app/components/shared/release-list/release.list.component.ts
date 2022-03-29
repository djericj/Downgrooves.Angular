import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';
import { ReleaseCollection } from 'src/app/models/release-collection';

@Component({
  selector: 'app-release-list',
  templateUrl: './release.list.component.html',
  styleUrls: ['./release.list.component.scss'],
})
export class ReleaseListComponent implements OnInit {
  @Input() collections: Observable<ReleaseCollection[]>;
  constructor() {}

  ngOnInit(): void {}
}
