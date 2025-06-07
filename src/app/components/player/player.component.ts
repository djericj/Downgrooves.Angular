import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { PlayerTrack } from 'src/app/models/player.track';

import * as moment from 'moment';
import { StreamState } from 'src/app/interfaces/stream-state';
import { SliderComponent } from "../../widgets/slider/slider.component";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: true,
  imports: [SliderComponent]
})
export class PlayerComponent implements OnInit {
  public state: StreamState;
  public currentTrack: PlayerTrack;
  public currentVolume: number = 100;
  public isShowing: boolean = false;

  @ViewChild('seekSlider', { static: true }) seekSlider: SliderComponent;
  @ViewChild('volumeSlider', { static: true }) volumeSlider: SliderComponent;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    let playerRegion = document.getElementById('player-region');
    playerRegion.hidden = true;

    this.playerService.getTrack().subscribe(track => {
      if (track) {
        this.currentTrack = track;
        this.setInfo();
        this.showPlayer();
        this.playerService.seekTo(0);
      }
    })

    this.playerService.getState().subscribe(state => {
      this.state = state;

      this.setDuration();
      this.setCurrentTime();
    });

    this.seekSlider.getValue().subscribe(e => {
      this.onSeek(e);
    });

    this.volumeSlider.getValue().subscribe(e => {
      this.playerService.setVolume(e);
    })
  }

  onSeek(e) {
    this.playerService.seekTo(e);
  }

  showPlayer() {
    let playerRegion = document.getElementById('player-region');
    if (!this.isShowing)
      playerRegion.hidden = false;

    this.isShowing = true;
  }

  setInfo() {
    let cover = document.getElementById('cover');
    let title = document.getElementById('track-title');
    let artist = document.getElementById('track-artist');

    if (cover)
      cover.setAttribute('src', this.currentTrack.cover);

    if (title)
      title.innerHTML = this.currentTrack.title;

    if (artist)
      artist.innerHTML = this.currentTrack.artist;
  }

  play() {
    this.playerService.play();
  }

  pause() {
    this.playerService.pause();
  }

  stop() {
    this.playerService.stop();
  }

  togglePlayPause() {
    if (this.state.playing)
      this.pause();
    else
      this.play();
  }

  setCurrentTime() {
    if (!this.state.currentTime)
      return;
    let currentTime = this.formatTime(this.state.currentTime, this.getTimeFormat(this.state.duration));
    let startTime = document.getElementById('start-time');
    startTime.innerHTML = currentTime.toString();
  }

  setDuration() {
    if (!this.state.duration)
      return;

    let duration = this.formatTime(this.state.duration, this.getTimeFormat(this.state.duration));
    let endTime = document.getElementById('end-time');
    if (endTime && duration)
      endTime.innerHTML = duration;
  }

  formatTime(time: number | undefined, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  getTimeFormat(duration: number) {
    return duration > 3600 ? "HH:mm:ss" : "mm:ss";
  }

  showTooltip(e: MouseEvent, el: HTMLElement) {
    let tooltip = document.getElementById('tooltip');
    var bcr = el.getBoundingClientRect();
    let clickPct = (e.clientX - bcr.left) / bcr.width;
    if (tooltip) {
      tooltip.innerHTML = this.formatTime(clickPct * this.state.duration);
      tooltip.style.left = (e.clientX - 25).toString() + 'px';
    }
  }
}
