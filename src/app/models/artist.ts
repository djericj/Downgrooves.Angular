import { Release } from './release';

export class Artist {
  artistId: number;
  name: string;
  description: string;
  releases: Release[] = [];
}
