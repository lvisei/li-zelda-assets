import { Marker } from '@antv/larkmap';
import React from 'react';
import type { MarkLocation } from '../types';

type MarkLayerProps = {
  locations: MarkLocation[];
};

const MarkLayer: React.FC<MarkLayerProps> = (props) => {
  const { locations } = props;

  return (
    <>
      {locations.map((location) => {
        return (
          <Marker
            key={`${location.latitude} ${location.longitude}`}
            lngLat={{ lng: location.longitude, lat: location.latitude }}
          />
        );
      })}
    </>
  );
};

export default MarkLayer;
