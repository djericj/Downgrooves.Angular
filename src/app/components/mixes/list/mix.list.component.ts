import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mix } from 'src/app/models/mix';

@Component({
  selector: 'app-mix-list',
  templateUrl: './mix.list.component.html',
  styleUrls: ['./mix.list.component.css'],
})
export class MixListComponent implements OnInit {
  @Input() mixes: Observable<Mix[]>;
  constructor() {}

  ngOnInit(): void {}
}
