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
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
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
  };

  ngOnInit() {
    this.audio = document.querySelector('audio');
    $('#player-region').hide();

    this._playerService.playerStatus$.subscribe((playing) => {
      this.playingStatus = playing;
      console.log(this.playingStatus);
      this.currentTrack = this._playerService.currentTrack;
      this.showPlayer(playing);
      this.setPlayIcon();
      this.volume$.next(this.currentVolume);
    });

    this.volume$.subscribe((v) => {
      if (this.audio) this.audio.volume = v;
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
    if (this.playingStatus == PlayerStatus.Paused) this.playingIcon = faPlay;
    else if (this.playingStatus == PlayerStatus.Playing)
      this.playingIcon = faPause;
    else this.playingIcon = faStop;
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

  mute() {
    this.volume$.next(0);
  }

  unmute() {
    this.volume$.next(this.currentVolume);
  }

  setVolume(volume: ChangeContext) {
    this.volume$.next(volume.value / 100);
  }
}
