import { Picture } from 'app/models/picture.model';

export interface Match {
  uuid: string;
  picture1: Picture;
  picture2: Picture;
}
