import { PictureData } from 'app/models/picture-data.model';
import { PictureElo } from 'app/models/picture-elo.model';
import { PictureStats } from 'app/models/picture-stats.model';

export interface PictureWithStats {
  uuid: string;
  elo: PictureElo;
  data: PictureData;
  stats: PictureStats;
}
