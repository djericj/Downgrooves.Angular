import { Track } from './track';
import { Artist } from './artist';

export class Mix {
  mixId: string = '';
  name: string = '';
  artist?: Artist;
  shortDescription: string = '';
  mp3File: string = '';
  attachment: string = '';
  createDate: string = '';
  category: string = '';
  totalPlays: string = '';
  tracks: Track[] | Track = [];
  length: string = '';
}
