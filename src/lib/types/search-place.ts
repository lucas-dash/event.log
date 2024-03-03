export type SearchPlaceType = {
  type: string;
  query: string[];
  features: Features[];
  attribution: string;
};

export type Features = {
  id: string;
  type: string;
  place_type: string;
  relevance: number;
  properties: {
    accuracy: string;
    mapbox_id: string;
  };
  text_en: string;
  place_name_en: string;
  text: string;
  place_name: string;
  matching_place_name: string;
  center: [number, number];
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  address: string;
  context: {
    id: string;
    mapbox_id: string;
    text_en: string;
    text: string;
  }[];
};
