import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Release } from '../models/release';

@Injectable()
export class AudioService {
  public audio: HTMLAudioElement;
  public timeElapsed: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining: BehaviorSubject<string> = new BehaviorSubject('-00:00');
  public percentElapsed: BehaviorSubject<number> = new BehaviorSubject(0);
  public percentLoaded: BehaviorSubject<number> = new BehaviorSubject(0);
  public playerStatus: BehaviorSubject<string> = new BehaviorSubject('paused');
  public currentTrack: BehaviorSubject<Release> = new BehaviorSubject(
    new Release()
  );

  constructor() {
    this.audio = new Audio();
    this.attachListeners();
  }

  private attachListeners(): void {
    this.audio.addEventListener('timeupdate', this.calculateTime, false);
    this.audio.addEventListener('playing', this.setPlayerStatus, false);
    this.audio.addEventListener('pause', this.setPlayerStatus, false);
    this.audio.addEventListener('progress', this.calculatePercentLoaded, false);
    this.audio.addEventListener('waiting', this.setPlayerStatus, false);
    this.audio.addEventListener('ended', this.setPlayerStatus, false);
  }

  private calculateTime = (evt: any) => {
    const currentTime = this.audio.currentTime;
    const trackDuration = this.audio.duration;
    this.setTimeElapsed(currentTime);
    this.setPercentElapsed(trackDuration, currentTime);
    this.setTimeRemaining(trackDuration, currentTime);
  };

  private calculatePercentLoaded = (evt: any) => {
    if (this.audio.duration > 0) {
      for (let i = 0; i < this.audio.buffered.length; i++) {
        if (
          this.audio.buffered.start(this.audio.buffered.length - 1 - i) <
          this.audio.currentTime
        ) {
          const percent =
            (this.audio.buffered.end(this.audio.buffered.length - 1 - i) /
              this.audio.duration) *
            100;
          this.setPercentLoaded(percent);
          break;
        }
      }
    }
  };

  private setPlayerStatus = (evt: any) => {
    switch (evt.type) {
      case 'playing':
        this.playerStatus.next('playing');
        break;
      case 'pause':
        this.playerStatus.next('paused');
        break;
      case 'waiting':
        this.playerStatus.next('loading');
        break;
      case 'ended':
        this.playerStatus.next('ended');
        break;
      default:
        this.playerStatus.next('paused');
        break;
    }
  };

  /**
   * If you need the audio instance in your component for some reason, use this.
   */
  public getAudio(): HTMLAudioElement {
    return this.audio;
  }

  /**
   * This is typically a URL to an MP3 file
   * @param src
   */
  // public setAudio(src: string): void {
  //     this.audio.src = src;
  //     this.playAudio();
  // }
  public setAudio(track: Release): void {
    //this.currentTrack = track;
    this.audio.src = track.previewUrl;
    this.playAudio();
  }

  /**
   * The method to play audio
   */
  public playAudio(): void {
    this.audio.play();
  }

  /**
   * The method to pause audio
   */
  public pauseAudio(): void {
    this.audio.pause();
  }

  /**
   * Method to seek to a position on the audio track (in milliseconds, I think),
   * @param position
   */
  public seekAudio(position: number): void {
    this.audio.currentTime = position;
  }

  /**
   * This formats the audio's elapsed time into a human readable format, could be refactored into a Pipe.
   * It takes the audio track's "currentTime" property as an argument. It is called from the, calulateTime method.
   * @param ct
   */
  private setTimeElapsed(ct: number): void {
    const seconds = Math.floor(ct % 60),
      displaySecs = seconds < 10 ? '0' + seconds : seconds,
      minutes = Math.floor((ct / 60) % 60),
      displayMins = minutes < 10 ? '0' + minutes : minutes;

    this.timeElapsed.next(displayMins + ':' + displaySecs);
  }

  /**
   * This method takes the track's "duration" and "currentTime" properties to calculate the remaing time the track has
   * left to play. It is called from the calculateTime method.
   * @param d
   * @param t
   */
  private setTimeRemaining(d: number, t: number): void {
    let remaining;
    const timeLeft = d - t,
      seconds = Math.floor(timeLeft % 60) || 0,
      remainingSeconds = seconds < 10 ? '0' + seconds : seconds,
      minutes = Math.floor((timeLeft / 60) % 60) || 0,
      remainingMinutes = minutes < 10 ? '0' + minutes : minutes,
      hours = Math.floor((timeLeft / 60 / 60) % 60) || 0;

    // remaining = (hours === 0)
    if (hours === 0) {
      remaining = '-' + remainingMinutes + ':' + remainingSeconds;
    } else {
      remaining = '-' + hours + ':' + remainingMinutes + ':' + remainingSeconds;
    }
    this.timeRemaining.next(remaining);
  }

  /**
   * This method takes the track's "duration" and "currentTime" properties to calculate the percent of time elapsed.
   * This is valuable for setting the position of a range input. It is called from the calculateTime method.
   * @param d
   * @param ct
   */
  private setPercentElapsed(d: number, ct: number): void {
    this.percentElapsed.next(Math.floor((100 / d) * ct) || 0);
  }

  /**
   * This method takes the track's "duration" and "currentTime" properties to calculate the percent of time elapsed.
   * This is valuable for setting the position of a range input. It is called from the calculatePercentLoaded method.
   * @param p
   */
  private setPercentLoaded(p: any): void {
    this.percentLoaded.next(parseInt(p, 10) || 0);
  }

  /**
   * This method returns an Observable whose value is the track's percent loaded
   */
  public getPercentLoaded(): Observable<number> {
    return this.percentLoaded.asObservable();
  }

  /**
   * This method returns an Observable whose value is the track's percent elapsed
   */
  public getPercentElapsed(): Observable<number> {
    return this.percentElapsed.asObservable();
  }

  /**
   * This method returns an Observable whose value is the track's percent loaded
   */
  public getTimeElapsed(): Observable<string> {
    return this.timeElapsed.asObservable();
  }

  /**
   * This method returns an Observable whose value is the track's time remaining
   */
  public getTimeRemaining(): Observable<string> {
    return this.timeRemaining.asObservable();
  }

  /**
   * This method returns an Observable whose value is the current status of the player.
   * This is useful inside your component to key off certain values, for example:
   *   - Show pause button when player status is 'playing'
   *   - Show play button when player status is 'paused'
   *   - Show loading indicator when player status is 'loading'
   *
   * See the setPlayer method for values.
   */
  public getPlayerStatus(): Observable<string> {
    return this.playerStatus.asObservable();
  }

  /**
   * If you need the current track instance in your component, use this.
   */
  // public getCurrentTrack(): ITunesTrack {
  //   return this.currentTrack;
  // }
  /**
   * Convenience method to toggle the audio between playing and paused
   */
  public toggleAudio(): void {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }
}
