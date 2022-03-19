import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VideoService } from 'src/app/services/video.service';
import { BaseComponent } from 'src/app/shared/base/base.component';
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-modular',
  templateUrl: './modular.component.html',
  styleUrls: ['./modular.component.css'],
})
export class ModularComponent extends BaseComponent implements OnInit {
  public videos: any[] = [];
  constructor(
    private _videoService: VideoService,
    private _titleService: Title
  ) {
    super();
    this._titleService.setTitle('Modular Live | Downgrooves Electronic Music');
    this.getData();
  }

  public myOptions: NgxMasonryOptions = {
    gutter: 1,
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
  };

  getData() {
    this._videoService.getJson().subscribe((x) => {
      this.videos = x;
    });
  }
}
