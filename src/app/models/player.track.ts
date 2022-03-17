export class PlayerTrack {
  constructor(
    artist: string,
    title: string,
    cover: string,
    audioFile: string,
    length: string
  ) {
    this.artist = artist;
    this.audioFile = audioFile;
    this.cover = cover;
    this.length = length;
    this.title = title;
  }
  artist: string = '';
  title: string = '';
  cover: string = '';
  audioFile: string = '';
  length: string = '';
}
