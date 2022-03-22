import { Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import {
  faPlay,
  faPause,
  faStop,
  faVolumeLow,
  faVolumeHigh,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { PlayerTrack } from 'src/app/models/player.track';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
  public volume: number;
  public playIcon = faPlay;
  public pauseIcon = faPause;
  public stopIcon = faStop;
  public volumeHighIcon = faVolumeHigh;
  public volumeLowIcon = faVolumeLow;

  public currentTrack: PlayerTrack;

  private isPlaying: boolean;
  private audio = document.querySelector('audio');

  constructor(private _playerService: PlayerService) {}

  ngOnInit() {
    this.getVolume();
    $('#player-region').hide();
    this._playerService.isPlaying$.subscribe((x) => {
      this.isPlaying = x;
      if (x) $('#player-region').show();
      else $('#player-region').hide();
    });
  }

  get playPauseButtonIcon(): IconDefinition {
    if (this.isPlaying) return faPause;
    else return faPlay;
  }

  resume() {
    this.isPlaying = true;
    this._playerService.resume();
  }

  play() {
    this.isPlaying = true;
    this._playerService.play();
  }

  pause() {
    this.isPlaying = false;
    this._playerService.pause();
  }

  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else this.play();
  }

  turnUp() {
    if (this.volume < 100) {
      if (this.audio) this.audio.volume += 0.1;
      this.getVolume();
    }
  }

  turnDown() {
    if (this.volume > 0) {
      if (this.audio) this.audio.volume -= 0.1;
      this.getVolume();
    }
  }

  getVolume() {
    if (this.audio) this.volume = Math.round(this.audio.volume * 100);
  }
}
