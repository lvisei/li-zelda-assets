import { CustomControl, useLayerList } from '@antv/larkmap';
import type { Layer } from '@antv/larkmap/es/types';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useEventPublish, useEventSubscribe } from '@antv/li-sdk';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import SvgComponent from '../ZeldaMobileLayout/SvgComponent';
import './Component.less';
import { CLS_PREFIX } from './constants';
import type { Properties } from './registerForm';

type ZeldaLayer = {
  name: string;
  value: 'sky' | 'ground' | 'underground';
  icon: string;
  id: string;
  instance: Layer;
};

export interface ZeldaLayerControlProps extends Properties, ImplementWidgetProps {}

const ZeldaLayerControl: React.FC<ZeldaLayerControlProps> = (props) => {
  const { position, undergroundLayerId, groundLayerId, skyLayerId } = props;
  const layerList = useLayerList();
  const [activeLayerId, setActiveLayerId] = useState<string>();
  const eventPublisher = useEventPublish();

  const zeldaLayerList = useMemo(() => {
    const allLayers = [
      { name: '天空', value: 'sky', icon: 'sky', id: skyLayerId },
      { name: '陆地', value: 'ground', icon: 'ground', id: groundLayerId },
      { name: '地下', value: 'underground', icon: 'underground', id: undergroundLayerId },
    ];
    const list = allLayers
      .filter((layer) => layer.id !== '')
      .map((layer) => ({ ...layer, instance: layerList.find((l) => l.id === layer.id) }))
      .filter((layer): layer is ZeldaLayer => layer.instance !== undefined);

    return list;
  }, [groundLayerId, layerList, skyLayerId, undergroundLayerId]);

  const handleActiveLayer = (layer: ZeldaLayer) => {
    if (layer.id === activeLayerId) return;

    for (const zeldaLayer of zeldaLayerList) {
      if (layer.id === zeldaLayer.id) {
        zeldaLayer.instance.show();
      } else {
        zeldaLayer.instance.hide();
      }
    }

    setActiveLayerId(layer.id);
  };

  useEventSubscribe('zelda-layer-default', (layerType: ZeldaLayer['value']) => {
    const layer = zeldaLayerList.find((item) => item.value === layerType);
    if (layer) {
      handleActiveLayer(layer);
    }
  });

  const onClickLayer = (layer: ZeldaLayer, value: ZeldaLayer['value']) => {
    if (layer.id === activeLayerId) return;

    handleActiveLayer(layer);
    eventPublisher('zelda-layer-change', value);
  };

  if (zeldaLayerList.length === 0) {
    return null;
  }

  return (
    <CustomControl position={position} className={`${CLS_PREFIX}__control`}>
      {zeldaLayerList.map((layer) => (
        <div
          key={layer.id}
          className={classNames(`${CLS_PREFIX}__item`, `${CLS_PREFIX}__zoomBtn`, {
            [`${CLS_PREFIX}__zoomBtn_active`]: layer.instance.isVisible(),
          })}
          onClick={() => onClickLayer(layer, layer.value)}
        >
          <SvgComponent icon={layer.icon} />
        </div>
      ))}
    </CustomControl>
  );
};

export default ZeldaLayerControl;
