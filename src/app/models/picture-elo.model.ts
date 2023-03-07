import { Gender } from 'app/models/gender.model';

export type PictureElo = {
  [key in Gender | 'all']: number;
};
