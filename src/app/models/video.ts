import { Thumbnail } from './thumbnail';

export class Video {
  artworkUrl: string;
  default: Thumbnail;
  description: string;
  eTag: string;
  high: Thumbnail;
  id: number;
  maxRes: Thumbnail;
  medium: Thumbnail;
  publishedAt: Date;
  sourceSystemId: number;
  standard: Thumbnail;
  thumbnails: Thumbnail[];
  title: string;
  videoUrl: string;
}
