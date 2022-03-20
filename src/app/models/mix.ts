import { Track } from './track';
import { Artist } from './artist';
import { Observable } from 'rxjs';

export class Mix {
  mixId: string;
  name: string;
  artist?: Artist;
  shortDescription: string;
  description: string;
  mp3File: string;
  attachment: string;
  createDate: string;
  category: string;
  totalPlays: string;
  tracks: Track[];
  length: string;
}
