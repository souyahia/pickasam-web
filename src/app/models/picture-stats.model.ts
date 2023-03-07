import { Gender } from 'app/models/gender.model';

export type PictureStats = {
  [key in Gender | 'all']: {
    wins: number;
    losses: number;
  };
};
