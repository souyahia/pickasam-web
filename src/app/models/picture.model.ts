export interface Picture {
  uuid: string;
  data: {
    type: 'Buffer';
    data: number[];
  };
}
