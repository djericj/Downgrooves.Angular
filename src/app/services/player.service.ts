import { Injectable } from '@angular/core';
import { PlayerTrack } from '../models/player.track';
import { Mix } from '../models/mix';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ReleaseTrack } from '../models/release.track';
import { StreamState } from '../interfaces/stream-state';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private stop$ = new Subject();
  private player = new Audio();
  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false
  };
  private stateChange$: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);
  private trackChange$ = new BehaviorSubject<PlayerTrack>(null);
  audioEvents = [
    'ended', 'error', 'play', 'playing', 'pause', 'timeupdate', 'canplay', 'loadedmetadata', 'loadstart'
  ];

  constructor() { }

  getState(): Observable<StreamState> {
    return this.stateChange$.asObservable();
  }

  getTrack(): Observable<PlayerTrack> {
    return this.trackChange$.asObservable();
  }

  playRelease(releaseTrack: ReleaseTrack) {
    this.trackChange$.next(this.releaseToPlayerTrack(releaseTrack));
    return this.playCurrentTrack().pipe(takeUntil(this.stop$));
  }

  playMix(mix: Mix) {
    this.trackChange$.next(this.mixToPlayerTrack(mix));
    return this.playCurrentTrack().pipe(takeUntil(this.stop$));
  }

  playCurrentTrack() {
    return new Observable(observer => {
      this.player.src = this.trackChange$.value.audioFile;
      this.player.load();
      this.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      this.addEvents(this.player, this.audioEvents, handler);
      return () => {
        this.player.pause();
        this.player.currentTime = 0;
        this.removeEvents(this.player, this.audioEvents, handler);
        this.resetState();
      };
    });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  stop() {
    this.stop$.next(null);
  }

  seekTo(seconds: number) {
    this.player.currentTime = seconds;
  }

  setVolume(volume: number) {
    this.player.volume = volume / 100;
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

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.player.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.player.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange$.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false,
    };
  }

  private addEvents(obj: HTMLAudioElement, events: any[], handler: (event: Event) => void) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: HTMLAudioElement, events: any[], handler: (event: Event) => void) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  private formatTime(time: number, format: string = "HH:mm:ss") {
    if (!time)
      return null;
    else {
      const momentTime = time * 1000;
      return moment.utc(momentTime).format(format);
    }
  }
}
