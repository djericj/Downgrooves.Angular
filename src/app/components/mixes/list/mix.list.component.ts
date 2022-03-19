import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mix } from 'src/app/models/mix';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-mix-list',
  templateUrl: './mix.list.component.html',
  styleUrls: ['./mix.list.component.css'],
})
export class MixListComponent implements OnInit {
  @Input() mixes: Observable<Mix[]>;
  constructor() {}

  public options: NgxMasonryOptions = {
    columnWidth: 320,
    itemSelector: '.grid-item',
    stamp: '.stamp',
  };

  ngOnInit(): void {}
}
