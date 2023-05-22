import { LayerSwitchControl, useLayerList } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import React, { useMemo } from 'react';
import type { Properties } from './registerForm';

export interface LayerControlProps extends Properties, ImplementWidgetProps {}

const LayerControl: React.FC<LayerControlProps> = (props) => {
  const layerList = useLayerList();
  const layerIdList = useMemo(() => layerList.map((layer) => layer.id), [layerList]);

  if (layerIdList.length === 0) {
    return null;
  }

  return <LayerSwitchControl position={props.position} layers={layerIdList} />;
};

export default LayerControl;
