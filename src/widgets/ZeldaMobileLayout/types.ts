export type MarkLocationMedum = {
  id: number;
  title: string;
  file_name: string;
  attribution: string;
  url: string;
  type: string;
  mine_type: string;
  meta: any;
  order: number;
};

export type MarkLocation = {
  title: string;
  description: string;
  longitude: number;
  latitude: number;
  tags: unknown[];
  media: MarkLocationMedum[];
  mapType: string;
  mapTypeName: string;
  category: string;
  icon: string;
  group: string;
  groupOrder: number;
};
