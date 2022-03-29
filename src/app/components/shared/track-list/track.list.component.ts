import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Release } from 'src/app/models/release';

@Component({
  selector: 'app-track-list',
  templateUrl: './track.list.component.html',
  styleUrls: ['./track.list.component.scss'],
})
export class TrackListComponent implements OnInit {
  @Input() tracks: Observable<Release[]>;
  constructor() {}

  ngOnInit(): void {}
}
