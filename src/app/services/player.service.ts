import { Injectable } from '@angular/core';
import { PlayerTrack } from '../models/player.track';
import { Mix } from '../models/mix';
import { Release } from '../models/release';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private cover?: JQuery<HTMLElement>;
  private title?: JQuery<HTMLElement>;
  private artist?: JQuery<HTMLElement>;
  private file?: string;
  private player?: HTMLAudioElement;
  private mp3src?: string;
  private offSetWidth: number = 1;
  constructor() {}

  play(track: PlayerTrack | null) {
    this.player = <HTMLAudioElement>document.getElementById('player2');
    //console.log(this.player);
    if (this.player && track) {
      //console.log(track);
      this.pause();
      this.load(track);
      this.player.play();
      this.player.onprogress = function () {};
      //console.log(track);
    }
  }
  resume() {
    if (this.player) {
      this.player.play();
    }
  }
  pause() {
    if (this.player) {
      this.player.pause();
    }
  }
  load(track: PlayerTrack) {
    if (this.player) {
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
        'assets/images/mixes/' + mix.attachment,
        'assets/mp3/' + mix.mp3File,
        mix.length
      );
    }
    return null;
  }
  trackToPlayerTrack(track: Release) {
    if (track) {
      return new PlayerTrack(
        track.artistName,
        track.trackCensoredName,
        track.artworkUrl100,
        track.previewUrl,
        track.trackTimeMillis
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
