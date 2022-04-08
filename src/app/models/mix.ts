import { MixTrack } from './mix.track';
import { Artist } from './artist';

export class Mix {
  mixId: number;
  title: string;
  artist?: Artist;
  shortDescription: string;
  description: string;
  audioUrl: string;
  artworkUrl: string;
  createDate: string;
  category: string;
  totalPlays: string;
  tracks: MixTrack[];
  length: string;
}
