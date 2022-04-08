import { RouterLink } from '@angular/router';
import { ReleaseTrack } from './release.track';

export class Release {
  artistName: string;
  artistViewUrl: string;
  artworkUrl: string;
  buyUrl: string;
  collectionId: number;
  copyright: string;
  country: string;
  discCount: number;
  discNumber: number;
  genre: string;
  id: number;
  isOriginal: boolean;
  isRemix: boolean;
  previewUrl: string;
  price: number;
  releaseDate: Date;
  title: string;
  tracks: ReleaseTrack[];
}
