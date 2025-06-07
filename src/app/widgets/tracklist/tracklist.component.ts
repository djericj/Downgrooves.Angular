import { Component, Input, OnInit } from '@angular/core';

import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-tracklist',
  templateUrl: './tracklist.component.html',
  styleUrls: ['./tracklist.component.scss'],
  standalone: true,
  imports: [ButtonComponent]
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

  constructor() { }

  ngOnInit(): void { }
}
