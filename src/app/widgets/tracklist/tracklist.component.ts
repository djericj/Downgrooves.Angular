import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss'],
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
    }
  ];
  @Input() onClick: (id: number) => void;

  constructor() {}

  ngOnInit(): void {}

  play = (id: number) => {
    this.onClick(id);
  };
}
