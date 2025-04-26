import { Attribute, Injectable } from '@angular/core';
import { PlayerStatus, PlayerTrack } from '../models/player.track';
import { Mix } from '../models/mix';
import { BehaviorSubject } from 'rxjs';
import { ReleaseTrack } from '../models/release.track';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  public currentTrack: PlayerTrack | null;
  public playerStatus$ = new BehaviorSubject<PlayerStatus>(PlayerStatus.Stopped);
  public currentTime$ = new BehaviorSubject<number>(0);
  private cover: HTMLElement | null;
  private title: HTMLElement | null;
  private artist: HTMLElement | null;
  private player: HTMLAudioElement;
  public playerRegion: HTMLElement | null
  public isShowing = false;

  constructor() {

  }

  showPlayer() {
    this.playerRegion = document.getElementById('player-region');
    if (this.playerRegion && !this.isShowing)
      this.playerRegion.hidden = false;

    this.isShowing = true;
  }

  playRelease(releaseTrack: ReleaseTrack) {
    this.currentTrack = this.releaseToPlayerTrack(releaseTrack);
    this.load(this.currentTrack);
    this.showPlayer();
    this.play();
  }

  playMix(mix: Mix) {
    this.currentTrack = this.mixToPlayerTrack(mix);
    this.load(this.currentTrack);
    this.showPlayer();
    this.play();
  }

  play() {
    this.player = <HTMLAudioElement>document.getElementById('player2');

    if (this.player && this.currentTrack) {
      this.player.play();
      this.player.onprogress = function (e) {
        console.log(e);
      };
      this.playerStatus$.next(PlayerStatus.Playing);
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
      this.playerStatus$.next(PlayerStatus.Stopped);
    }
  }
  load(track: PlayerTrack | null) {
    if (!track)
      return;

    this.player = <HTMLAudioElement>document.getElementById('player2');

    if (this.player) {
      this.stop();
      this.currentTrack = track;
      this.setInfo(track);
      this.setCover(track);
      let src = document.getElementById('mp3_src');
      src?.setAttribute('src', track.audioFile);
      this.player.load();
      this.initProgressBar(this);
    }
  }
  setInfo(track: PlayerTrack) {
    this.title = document.getElementById('track-title');
    this.artist = document.getElementById('track-artist');

    if (this.title)
      this.title.innerHTML = track.title;

    if (this.artist)
      this.artist.innerHTML = track.artist;
  }
  setCover(track: PlayerTrack) {
    this.cover = document.getElementById('cover');
    if (this.cover) {
      this.cover.setAttribute('src', track.cover);
    }
  }
  mixToPlayerTrack(mix: Mix) {
    if (mix) {
      return new PlayerTrack(
        mix.title,
        'mixed by ' + mix.artist,
        mix.artworkUrl,
        mix.audioUrl,
        mix.length
      );
    }
    return null;
  }
  releaseToPlayerTrack(releaseTrack: ReleaseTrack) {
    if (releaseTrack) {
      return new PlayerTrack(
        releaseTrack.artistName,
        releaseTrack.title,
        releaseTrack.artworkUrl,
        releaseTrack.previewUrl,
        releaseTrack.trackTimeInMilliseconds.toString()
      );
    }
    return null;
  }

  initProgressBar(scope: any) {
    let parent = scope;
    let player = <HTMLAudioElement>document.getElementById('player2');
    let progressbar = <HTMLProgressElement>document.getElementById('seek-obj');
    let progressOverlay = document.getElementById('progress');
    let tooltip = document.getElementById('tooltip');
    let mapPin = document.getElementById('current-position');
    let progressContainer = document.getElementById('progress-container');
    let isClicked = false;

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
      let timeElapsedPct = (pct * 100);

      if (progressContainer) {
        let progressInPixels = progressContainer.offsetWidth * (timeElapsedPct / 100);
        var progressBar = <HTMLProgressElement>(document.getElementById('progress-bar'));
        var currentPos = <HTMLElement>(document.getElementById('current-position'));
        progressBar.style.width = progressInPixels.toString() + "px";
        currentPos.style.left = progressInPixels.toString() + "px";
      }
      if (player.currentTime == player.duration) {
        parent.stop();
      }
      parent.currentTime$.next(currentTime);
    });

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
      let playerStatus = parent.playerStatus$.value;
      if (playerStatus == PlayerStatus.Playing)
        parent.pause();
    });

    mapPin?.addEventListener("mouseup", function () {
      isClicked = false;
      mapPin.style.cursor = "grab";
      let playerStatus = parent.playerStatus$.value;
      if (playerStatus == PlayerStatus.Paused)
        player.play();
    });

    progressContainer?.addEventListener("mousemove", function (e) {
      if (!isClicked)
        return;

      seek(e, this);
    });

    progressContainer?.addEventListener("mouseleave", function () {
      isClicked = false;
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
      player.currentTime = clickPct * player.duration;
      progressbar.value = clickPct / 100;
    }

    function showTooltip(e: MouseEvent, el: HTMLElement) {
      var bcr = el.getBoundingClientRect();
      let clickPct = (e.clientX - bcr.left) / bcr.width;
      if (tooltip) {
        tooltip.innerHTML = formatTime(clickPct * player.duration);
        tooltip.style.left = (e.clientX - 25).toString() + 'px';
      }
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
  }
}
