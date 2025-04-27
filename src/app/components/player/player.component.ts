import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { PlayerTrack } from 'src/app/models/player.track';
import { Options, ChangeContext, NgxSliderModule } from '@angular-slider/ngx-slider';
import { BehaviorSubject } from 'rxjs';
import { NgIf } from '@angular/common';
import * as moment from 'moment';
import { StreamState } from 'src/app/interfaces/stream-state';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: true,
  imports: [NgxSliderModule, NgIf]
})
export class PlayerComponent implements OnInit {
  public state: StreamState;
  public currentTrack: PlayerTrack;
  public currentVolume: number = 100;
  public volume$ = new BehaviorSubject<number>(this.currentVolume);
  public isShowing: boolean = false;

  constructor(private playerService: PlayerService) { }

  options: Options = {
    floor: 0,
    ceil: 100,
    hideLimitLabels: true,
    hidePointerLabels: true,
  };

  ngOnInit() {
    let playerRegion = document.getElementById('player-region');
    playerRegion.hidden = true;

    this.playerService.getTrack().subscribe(track => {
      if (track) {
        this.currentTrack = track;
        this.setInfo();
        this.showPlayer();
        //this.startProgress();
      }
    })

    this.playerService.getState().subscribe(state => {
      this.state = state;
      console.log(state);

      this.setDuration();
      this.setCurrentTime();
    });

    this.volume$.subscribe({
      next: (volume) => {
        this.playerService.setVolume(volume);
      },
    });
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

  setVolume(volume: ChangeContext) {
    this.volume$.next(volume.value);
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

  startProgress() {
    let pct = this.state.currentTime / this.state.duration;
    let timeElapsedPct = (pct * 100);

    let progressContainer = document.getElementById('progress-container');

    if (progressContainer) {
      let progressInPixels = progressContainer.offsetWidth * (timeElapsedPct / 100);
      var progressBar = <HTMLProgressElement>(document.getElementById('progress-bar'));
      var currentPos = <HTMLElement>(document.getElementById('current-position'));
      progressBar.style.width = progressInPixels.toString() + "px";
      currentPos.style.left = progressInPixels.toString() + "px";

      progressContainer?.addEventListener("mousemove", function (e) {
        // if (!isClicked)
        //   return;

        // seek(e, this);
      });

      progressContainer?.addEventListener("mouseleave", function () {
        //isClicked = false;
      });
    }
  }

  initProgressBar(scope: any) {
    let parent = scope;
    let progressbar = <HTMLProgressElement>document.getElementById('seek-obj');
    let progressOverlay = document.getElementById('progress');
    let tooltip = document.getElementById('tooltip');
    let mapPin = document.getElementById('current-position');

    let isClicked = false;

    mapPin?.addEventListener("mousemove", function (e) {
      if (!isClicked)
        return;

      mapPin.style.left = (e.clientX).toString() + 'px';
    });

    mapPin?.addEventListener("mouseover", function () {
      mapPin.style.cursor = "grab";
    });

    mapPin?.addEventListener("mouseleave", function () {
      mapPin.style.cursor = "unset";
    });

    mapPin?.addEventListener("mousedown", function () {
      isClicked = true;
      mapPin.style.cursor = "grabbing";
    });

    mapPin?.addEventListener("mouseup", function () {
      isClicked = false;
      mapPin.style.cursor = "grab";
    });

    progressOverlay?.addEventListener('click', function (e) {
      seek(e, this);
    });

    progressOverlay?.addEventListener('mousemove', function (e) {
      showTooltip(e, this);
    });

    progressOverlay?.addEventListener('mouseover', function () {
      if (tooltip) tooltip.style.opacity = '1';
    });

    progressOverlay?.addEventListener('mouseout', function () {
      if (tooltip) tooltip.style.opacity = '0';
    });

    function seek(e: MouseEvent, el: HTMLElement) {
      var bcr = el.getBoundingClientRect();
      let clickPct = (e.clientX - bcr.left) / bcr.width;
      this.playerService.seekTo(clickPct * this.state.duration)
      progressbar.value = clickPct / 100;
    }

    function showTooltip(e: MouseEvent, el: HTMLElement) {
      var bcr = el.getBoundingClientRect();
      let clickPct = (e.clientX - bcr.left) / bcr.width;
      if (tooltip) {
        tooltip.innerHTML = this.formatTime(clickPct * this.state.duration);
        tooltip.style.left = (e.clientX - 25).toString() + 'px';
      }
    }
  }
}
