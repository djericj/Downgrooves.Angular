import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';
import { PlayerStatus, PlayerTrack } from 'src/app/models/player.track';
import { Options, ChangeContext, NgxSliderModule } from '@angular-slider/ngx-slider';
import { BehaviorSubject } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: true,
  imports: [NgxSliderModule, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerComponent implements OnInit {
  public currentVolume: number = 100;
  public volume$ = new BehaviorSubject<number>(this.currentVolume);
  public playerStatus$ = new BehaviorSubject<PlayerStatus>(PlayerStatus.Stopped);
  public currentTrack: PlayerTrack | null;
  public isShowing: boolean = false;
  public audio = document.querySelector('audio');

  constructor(private _playerService: PlayerService) { }

  options: Options = {
    floor: 0,
    ceil: 100,
    hideLimitLabels: true,
    hidePointerLabels: true,
  };

  ngOnInit() {
    let playerRegion = document.getElementById('player-region');
    this.audio = document.querySelector('audio');

    this._playerService.playerStatus$.subscribe({
      next: (status) => {
        this.playerStatus$.next(status);
        if (this.playerStatus$.value == PlayerStatus.Playing) {
          this.currentTrack = this._playerService.currentTrack;
          this.volume$.next(this.currentVolume);
        }
      },
    });

    this.volume$.subscribe({
      next: (volume) => {
        if (this.audio) this.audio.volume = volume / 100;
      },
    });

    if (playerRegion)
      playerRegion.hidden = true;
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
  }

  togglePlayPause() {
    if (this.playerStatus$.value == PlayerStatus.Playing) {
      this.pause();
    } else if (this.playerStatus$.value == PlayerStatus.Paused) {
      this.resume();
    } else this.play();
  }

  setVolume(volume: ChangeContext) {
    this.volume$.next(volume.value);
  }
}
