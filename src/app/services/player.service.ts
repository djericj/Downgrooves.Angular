import { Injectable } from '@angular/core';
import { PlayerTrack } from '../models/player.track';
import { Mix } from '../models/mix';
import { Release } from '../models/release';
import * as $ from 'jquery';
import { ConfigService } from './config.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public currentTrack: PlayerTrack | null;
  public isPlaying$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

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
    this.isPlaying$.next(true);
    this.player = <HTMLAudioElement>document.getElementById('player2');

    if (this.player && this.currentTrack) {
      //console.log(track);
      this.pause();
      this.load(this.currentTrack);
      this.player.play();
      this.player.onprogress = function () {};
      //console.log(track);
    }
  }
  resume() {
    if (this.player) {
      this.player.play();
      this.isPlaying$.next(true);
    }
  }
  pause() {
    if (this.player) {
      this.player.pause();
      this.isPlaying$.next(false);
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
    let length = player.duration;
    let current_time = player.currentTime;
    let progressbar = <HTMLProgressElement>document.getElementById('seek-obj');

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
      let progressBar = document.getElementById('progress-bar');
      if (progressBar) progressBar.style.width = (pct * 100).toFixed() + '%';
      //console.log(player.currentTime / player.duration);
    });

    // calculate total length of value
    //var totalLength = calculateTotalValue(length);
    //document.getElementById("end-time").innerHTML = player.duration.toFixed();
    //document.getElementById("end-time").innerHTML = progressbar.max.toFixed();

    // calculate current value time
    //var currentTime = calculateCurrentValue(current_time);
    //document.getElementById("start-time").innerHTML = currentTime;

    //progressbar.value = player.currentTime / player.duration;
    progressbar.addEventListener('click', seek);
    progressbar.addEventListener('progress', prog);

    if (player.currentTime == player.duration) {
      let playButton = document.getElementById('play-btn');
      if (playButton) playButton.className = '';
    }

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

    function seek(this: any, event: any) {
      let percent = event.offsetX / this.offsetWidth;
      player.currentTime = percent * player.duration;
      progressbar.value = percent / 100;
    }
  }
}
