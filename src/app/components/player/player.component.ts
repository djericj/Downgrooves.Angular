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
import { PlayerStatus, PlayerTrack } from 'src/app/models/player.track';
import { Options, ChangeContext } from '@angular-slider/ngx-slider';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit {
  public currentVolume: number = 100;
  public volume$: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.currentVolume
  );
  public playIcon = faPlay;
  public pauseIcon = faPause;
  public stopIcon = faStop;
  public volumeHighIcon = faVolumeHigh;
  public volumeLowIcon = faVolumeLow;

  public currentTrack: PlayerTrack | null;

  private isShowing: boolean = false;

  private playingStatus: PlayerStatus;
  private audio = document.querySelector('audio');

  public playingIcon: IconDefinition;

  constructor(private _playerService: PlayerService) {}

  options: Options = {
    floor: 0,
    ceil: 100,
    hideLimitLabels: true,
    hidePointerLabels: true,
  };

  ngOnInit() {
    this.audio = document.querySelector('audio');
    $('#player-region').hide();

    this._playerService.playerStatus$.subscribe({
      next: (status) => {
        this.playingStatus = status;
        if (status == PlayerStatus.Playing) {
          this.currentTrack = this._playerService.currentTrack;
          this.showPlayer(status);
          this.volume$.next(this.currentVolume);
        }
        this.setPlayIcon();
      },
    });

    this.volume$.subscribe({
      next: (v) => {
        if (this.audio) this.audio.volume = v / 100;
      },
    });
  }

  showPlayer(playing: PlayerStatus) {
    if (playing == PlayerStatus.Playing || playing == PlayerStatus.Paused) {
      if (!this.isShowing) {
        $('#player-region').show();
        this.isShowing = true;
      }
    } else {
      if (this.isShowing) {
        $('#player-region').hide();
        this.isShowing = false;
      }
    }
  }

  setPlayIcon() {
    if (
      this.playingStatus == PlayerStatus.Paused ||
      this.playingStatus == PlayerStatus.Stopped
    )
      this.playingIcon = faPlay;
    else if (this.playingStatus == PlayerStatus.Playing)
      this.playingIcon = faPause;
  }

  resume() {
    this._playerService.resume();
  }

  play() {
    this._playerService.play();
  }

  pause() {
    this._playerService.pause();
  }

  stop() {
    this._playerService.stop();
    this.playingIcon = faPlay;
  }

  togglePlayPause() {
    if (this.playingStatus == PlayerStatus.Playing) {
      this.pause();
    } else if (this.playingStatus == PlayerStatus.Paused) {
      this.resume();
    } else this.play();
  }

  setVolume(volume: ChangeContext) {
    this.volume$.next(volume.value / 100);
  }
}
