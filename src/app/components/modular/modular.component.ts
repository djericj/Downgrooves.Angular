import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VideoService } from 'src/app/services/video.service';
import { BaseComponent } from 'src/app/base.component';
import { NgxMasonryOptions } from 'ngx-masonry';
import { Video } from 'src/app/models/video';

@Component({
    selector: 'app-modular',
    templateUrl: './modular.component.html',
    styleUrls: ['./modular.component.scss'],
    standalone: false
})
export class ModularComponent extends BaseComponent implements OnInit {
  public videos: Video[] = [];
  public myOptions: NgxMasonryOptions = {
    columnWidth: 320,
    itemSelector: '.grid-item',
    stamp: '.stamp',
  };

  constructor(
    private _videoService: VideoService,
    private _titleService: Title
  ) {
    super(_titleService);
  }

  ngOnInit(): void {
    this._titleService.setTitle('Modular Live | Downgrooves Electronic Music');
    this._videoService.getVideos().subscribe({
      next: (x) => (this.videos = x),
    });
  }

  navigateTo = (args: any) => {
    var video = args as Video;
    return () => {
      window.open(video.videoUrl, '_new');
      return;
    };
  };
}
