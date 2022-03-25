import { Injectable } from '@angular/core';
import { PlayerStatus, PlayerTrack } from '../models/player.track';
import { Mix } from '../models/mix';
import { Release } from '../models/release';
import * as $ from 'jquery';
import { ConfigService } from './config.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public currentTrack: PlayerTrack | null;
  public playerStatus$: BehaviorSubject<PlayerStatus> =
    new BehaviorSubject<PlayerStatus>(PlayerStatus.Stopped);

  private cover?: JQuery<HTMLElement>;
  private title?: JQuery<HTMLElement>;
  private artist?: JQuery<HTMLElement>;
  private player?: HTMLAudioElement;

  private cdnUrl: string;

  constructor(private _configService: ConfigService) {
    this.cdnUrl = _configService.cdnUrl;
  }

  playRelease(release: Release) {
    this.currentTrack = this.releaseToPlayerTrack(release);
    this.play();
  }

  playMix(mix: Mix) {
    this.currentTrack = this.mixToPlayerTrack(mix);
    this.play();
  }

  play() {
    this.player = <HTMLAudioElement>document.getElementById('player2');

    if (this.player && this.currentTrack) {
      //console.log(track);
      this.pause();
      this.load(this.currentTrack);
      this.player.play();
      this.player.onprogress = function () {};
      this.playerStatus$.next(PlayerStatus.Playing);
      //console.log(track);
    }
  }
  resume() {
    if (this.player) {
      this.player.play();
      this.playerStatus$.next(PlayerStatus.Playing);
    }
  }
  pause() {
    if (this.player) {
      this.player.pause();
      this.playerStatus$.next(PlayerStatus.Paused);
    }
  }
  stop() {
    if (this.player) {
      this.player.pause();
      this.player.currentTime = 0;
    }
  }
  load(track: PlayerTrack) {
    if (this.player) {
      this.currentTrack = track;
      this.setInfo(track);
      this.setCover(track);
      $('#mp3_src').attr('src', track.audioFile);
      this.player.load();
      this.initProgressBar();
      $('#player-region').show();
    }
  }
  setInfo(track: PlayerTrack) {
    this.title = $('#track-title');
    this.artist = $('#track-artist');
    this.title.text(track.title);
    this.artist.text(track.artist);
  }
  setCover(track: PlayerTrack) {
    this.cover = $('#cover');
    if (this.cover) {
      this.cover.attr('src', track.cover);
    }
  }
  mixToPlayerTrack(mix: Mix) {
    if (mix) {
      return new PlayerTrack(
        mix.name,
        'mixed by ' + mix.artist,
        this.cdnUrl + 'images/mixes/' + mix.attachment,
        this.cdnUrl + 'mp3/' + mix.mp3File,
        mix.length
      );
    }
    return null;
  }
  releaseToPlayerTrack(release: Release) {
    if (release) {
      return new PlayerTrack(
        release.artistName,
        release.trackCensoredName,
        release.artworkUrl100,
        release.previewUrl,
        release.trackTimeMillis.toString()
      );
    }
    return null;
  }

  initProgressBar() {
    let player = <HTMLAudioElement>document.getElementById('player2');
    let isTracking = false;
    let length = player.duration;
    let current_time = player.currentTime;
    let progressbar = <HTMLProgressElement>document.getElementById('seek-obj');
    let progressOverlay = document.getElementById('progress');

    progressOverlay?.addEventListener('click', function (e) {
      var bcr = this.getBoundingClientRect();
      let clickPct = (e.clientX - bcr.left) / bcr.width;
      seek(clickPct);
    });

    progressOverlay?.addEventListener('mousemove', function (e) {
      var bcr = this.getBoundingClientRect();
      let clickPct = (e.clientX - bcr.left) / bcr.width;
      let pc = clickPct * player.duration;
      let ft = formatTime(pc);
      console.log(ft);
    });

    progressOverlay?.addEventListener('mouseover', function (e) {
      if (!isTracking) isTracking = true;
    });

    progressOverlay?.addEventListener('mouseout', function (e) {
      if (isTracking) isTracking = false;
    });

    player.addEventListener('loadedmetadata', function () {
      let totalLength = formatTime(player.duration);
      let endTime = document.getElementById('end-time');
      if (endTime) endTime.innerHTML = totalLength;
    });

    player.addEventListener('timeupdate', function () {
      let currentTime = formatTime(player.currentTime);
      let startTime = document.getElementById('start-time');
      if (startTime) startTime.innerHTML = currentTime;
      let pct = player.currentTime / player.duration;
      var progressBar = <HTMLProgressElement>(
        document.getElementById('progress-bar')
      );
      progressBar.style.width = (pct * 100).toFixed() + '%';
    });

    // calculate total length of value

    function formatTime(seconds: number) {
      let minutes: any = Math.floor(seconds / 60);
      let secs: any = Math.floor(seconds % 60);

      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      if (secs < 10) {
        secs = '0' + secs;
      }

      return minutes + ':' + secs;
    }

    function prog() {
      let progressbar = <HTMLProgressElement>(
        document.getElementById('seek-obj')
      );
      //console.log(progressbar.value.toFixed());
      let endTime = document.getElementById('end-time');
      if (endTime) endTime.innerHTML = progressbar.value.toFixed();
    }

    function seek(percent: number) {
      player.currentTime = percent * player.duration;
      progressbar.value = percent / 100;
    }
  }
}
