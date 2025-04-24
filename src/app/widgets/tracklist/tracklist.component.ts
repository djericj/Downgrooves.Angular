import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-tracklist',
    templateUrl: './tracklist.component.html',
    styleUrls: ['./tracklist.component.scss'],
    standalone: false
})
export class TracklistComponent implements OnInit {
  @Input() tracks: [
    {
      id: number;
      title: string;
      trackNumber: number;
      artistName: string;
      url?: string;
      label?: string;
      playFunc: () => void;
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
