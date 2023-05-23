import type { ImplementWidgetProps } from '@antv/li-sdk';
import { MapContainer } from '@antv/li-sdk';
import classNames from 'classnames';
import React, { useLayoutEffect, useMemo, useState } from 'react';
import './Component.less';
import { CLS_PREFIX } from './constant';
import FilterPanel from './FilterPanel';
import MarkLayer from './MarkLayer';
import type { Properties } from './registerForm';
import RegisterSvgs from './RegisterSvgs';
import type { MarkLocation } from './types';

export interface ZeldaMobileLayoutProps
  extends Properties,
    ImplementWidgetProps<'content' | 'controls'> {
  children?: React.ReactNode;
}

const ZeldaMobileLayout: React.FC<ZeldaMobileLayoutProps> = (props) => {
  const { slotsElements, children, datasetId = '' } = props;
  const [locations, setLocations] = useState<MarkLocation[]>([]);

  const mapContainerSlots = useMemo(
    () => ({ content: slotsElements.content, controls: slotsElements.controls }),
    [slotsElements.content, slotsElements.controls],
  );

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
  }, []);

  const onFilterChange = (_locations: MarkLocation[]) => {
    setLocations(_locations);
  };

  return (
    <div className={CLS_PREFIX}>
      <RegisterSvgs />
      <div className={`${CLS_PREFIX}__main`}>
        <MapContainer
          className={classNames(`${CLS_PREFIX}__map-container`)}
          slotsElements={mapContainerSlots}
        >
          <MarkLayer locations={locations} />
          {children}
        </MapContainer>
      </div>
      <FilterPanel datasetId={datasetId} onFilterChange={onFilterChange} />
    </div>
  );
};

export default ZeldaMobileLayout;
